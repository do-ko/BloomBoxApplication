package com.domann.bloombox.rest;

import com.domann.bloombox.entity.Plant;
import com.domann.bloombox.entity.Remainder;
import com.domann.bloombox.service.PlantService;
import com.domann.bloombox.service.RemainderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

import javax.xml.crypto.Data;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

import static java.time.temporal.ChronoUnit.DAYS;

@RestController
@RequestMapping("/api/remainders")
public class RemainderRestController {
    private RemainderService remainderService;
    private PlantService plantService;

    @Autowired
    public RemainderRestController(RemainderService remainderService, PlantService plantService) {
        this.remainderService = remainderService;
        this.plantService = plantService;
    }

    @GetMapping("")
    public List<Remainder> findAll(){
        return remainderService.findAllRemainders();
    }

    @GetMapping("plant/{plantId}")
    public List<Remainder> findByPlantId(@PathVariable int plantId){
        List<Remainder> remainders = remainderService.findByPlantId(plantId);
        if (remainders == null){
            throw new LocationNotFoundException("Remainders with plantId not found - " + plantId);
        }
        return remainders;
    }

    @GetMapping("user/{userId}")
    public List<Remainder> findByUserId(@PathVariable int userId){
        return remainderService.findByUserId(userId);
    }

    @GetMapping("/{remainderId}")
    public Remainder findById(@PathVariable int remainderId){
        Remainder remainder = remainderService.findById(remainderId);
        if (remainder==null){
            throw new LocationNotFoundException("Remainder id not found - " + remainderId);
        }
        return remainder;
    }

    @PostMapping("")
    public Remainder addRemainder(@RequestBody Remainder remainder){
        remainder.setRemainderId(0);
        return remainderService.save(remainder);
    }

    @PostMapping("/many")
    public List<Remainder> addRemainders(@RequestBody List<Remainder> remainders){
        List<Remainder> listOfRemainders = new ArrayList<>();
        remainders.forEach(remainder -> remainder.setRemainderId(0));
        remainders.forEach(remainder -> listOfRemainders.add(remainderService.save(remainder)));

        return listOfRemainders;
//        return remainderService.save(remainder);
    }
    @PutMapping("")
    public Remainder updateRemainder(@RequestBody Remainder remainder){
        return remainderService.save(remainder);
    }

    @DeleteMapping("/{remainderId}")
    public String deleteRemainder(@PathVariable int remainderId){
        Remainder remainder = remainderService.findById(remainderId);
        if (remainder==null){
            throw new LocationNotFoundException("Remainder id not found - " + remainderId);
        }

        remainderService.deleteById(remainderId);

        return "Deleted remainder with id: " + remainderId;
    }

//    @Scheduled(fixedDelay = 30000)
    @Scheduled(cron = "0 0 0 * * *")
    public void ReviewRemaindersAtMidnight(){
        List<Remainder> remainders = remainderService.findAllRemainders();
        List<Remainder> completedTasks = new ArrayList<>();
        Date today = new Date();
        Date yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
        LocalDate localDate = today.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        LocalDate localDateYesterday = yesterday.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        String[] todayDateSplit = today.toString().split(" ");
        String[] yesterdayDateSplit = yesterday.toString().split(" ");
        String todayDateString = todayDateSplit[5] + "-" + (localDate.getMonthValue() < 10 ? "0" + localDate.getMonthValue() : localDate.getMonthValue())  + "-" + todayDateSplit[2];
        String yesterdayDateString = yesterdayDateSplit[5] + "-" + (localDateYesterday.getMonthValue() < 10 ? "0" + localDateYesterday.getMonthValue() : localDateYesterday.getMonthValue())  + "-" + yesterdayDateSplit[2];


//      THIS CODE WILL LOOK FOR REMAINDERS THAT ARE HAPPENING TODAY FOR EACH PLANT AND TYPE
//       AND THEN SET ALL OVERDUE REMAINDERS WITH SAME TYPE FOR THAT PLANT AS FAILED
        remainders.forEach(remainder -> {
            String remainderDateString = remainder.getRemainderDay().toString().split(" ")[0];
            String remainderDoneDateString = null;
            if (remainder.getDoneDate() != null){
                remainderDoneDateString = remainder.getDoneDate().toString().split(" ")[0];
            }
            if (Objects.equals(remainderDateString, todayDateString)){
//                if remainder is set for today
//                System.out.println("Caught");
                List<Remainder> remaindersForPlant = remainders.stream().filter(rem -> {return Objects.equals(rem.getPlantId(), remainder.getPlantId()) && Objects.equals(rem.getRemainderType(), remainder.getRemainderType());
                }).toList();
                remaindersForPlant.forEach(remainder1 -> {
                    String remainder1DateString = remainder1.getRemainderDay().toString().split(" ")[0];
                    if (!remainder1.getDone() && compareDates(todayDateString, remainder1DateString)){
                        System.out.println("Failed: " + remainder1.getRemainderId());
                        remainder1.setFailed(true);
                        remainderService.save(remainder1);
                    }
                });
            }

            if (Objects.equals(remainderDoneDateString, yesterdayDateString)){
                completedTasks.add(remainder);
            }

        });


//        COMPLETED TASKS -> MOVE UPCOMING TASKS
        if (!completedTasks.isEmpty()){
//            DIVIDING TASKS PER PLANTS
            Map<Integer, List<Remainder>> tasksDividedByPlants = completedTasks.stream().collect(Collectors.groupingBy(Remainder::getPlantId));
                for (Integer plantKey : tasksDividedByPlants.keySet()){
//                    DIVIDING PLANTS PER TYPE OF REMAINDER
                    Map<String, List<Remainder>> tasksDividedByRemainderType = tasksDividedByPlants.get(plantKey).stream().collect(Collectors.groupingBy(Remainder::getRemainderType));
                    for (String remainderKey : tasksDividedByRemainderType.keySet()){
//                        System.out.println(tasksDividedByRemainderType.get(remainderKey));
                        List<Remainder> tasks = tasksDividedByRemainderType.get(remainderKey);

//                        GETTING LATEST COMPLETED REMAINDER
                        String latestCompletedRemainderDay = tasks.get(0).getRemainderDay().toString().split(" ")[0];
                        Remainder latestCompletedTask = tasks.get(0);
                        for (Remainder task : tasks) {
                            if (compareDates(task.getRemainderDay().toString().split(" ")[0], latestCompletedRemainderDay)) {
                                latestCompletedRemainderDay = task.getRemainderDay().toString().split(" ")[0];
                                latestCompletedTask = task;
                            }
                        }
                        System.out.println(latestCompletedRemainderDay);
                        System.out.println(latestCompletedTask);

//                        ADJUST FUTURE REMAINDERS
//                        GETTING ALL NOT DONE AND NOT FAILED REMAINDERS FOR PLANT ID AND REMAINDER TYPE
//                        List<Remainder> allNotDoneRemainders = remainders.stream().filter(remainder -> {return remainder.getPlantId() == latestCompletedTask.getPlantId()}).toList();
                        List<Remainder> allNotDoneRemainders = new ArrayList<>();
                        for (Remainder rem : remainders){
                            if (Objects.equals(rem.getPlantId(), latestCompletedTask.getPlantId()) && Objects.equals(rem.getRemainderType(), latestCompletedTask.getRemainderType()) && !rem.getDone()){
                                allNotDoneRemainders.add(rem);
                            }
                        }

//                        GET PLANT TO GET
                        Plant plant = plantService.findById(latestCompletedTask.getPlantId());

                        System.out.println(allNotDoneRemainders);
//                        PUSH REMAINDERS BY DIFFERENCE IN TIME BETWEEN LATEST COMPLETED TASK AND TASK ON THE LIST
//                        allNotDoneRemainders.forEach(task -> {
////                            get individual difference here
//                            LocalDate date = LocalDate.parse(task.getRemainderDay().toString().split(" ")[0]);
//
//                            System.out.println(date.toString());
//                            System.out.println(localDateYesterday);
//                            System.out.println(DAYS.between(localDateYesterday, date));
//
//                            long difference = plant.getFrequency() - DAYS.between(localDateYesterday, date);
//
//                            System.out.println(difference);
//                            System.out.println(date.plusDays(difference));
//                            Date newDate = Date.from(date.plusDays(difference).atStartOfDay(ZoneId.systemDefault()).toInstant());
//                            System.out.println(newDate);
//                            task.setRemainderDay(newDate);
//                            remainderService.save(task);
//                        });

//                        GET SOONEST TASK IN THE FURURE -> GET DIFFERENCT AND SAVE IT -> ADDD IT TO FREQUENCY OF EACH UPCOMING TASK.
                        String soonestUpcomingTaskDate = allNotDoneRemainders.get(0).getRemainderDay().toString().split(" ")[0];
                        Remainder soonestUpcomingTask = allNotDoneRemainders.get(0);
                        for (Remainder task : allNotDoneRemainders) {
                            if (compareDates(soonestUpcomingTaskDate, task.getRemainderDay().toString().split(" ")[0])) {
                                soonestUpcomingTaskDate = task.getRemainderDay().toString().split(" ")[0];
                                soonestUpcomingTask = task;
                            }
                        }

                        System.out.println(soonestUpcomingTask);
                        LocalDate date = LocalDate.parse(soonestUpcomingTaskDate);
                        long difference = plant.getFrequency() - DAYS.between(localDateYesterday, date);
                        System.out.println(difference);


                        allNotDoneRemainders.forEach(task -> {
//                            get individual difference here
                            LocalDate date1 = LocalDate.parse(task.getRemainderDay().toString().split(" ")[0]);
                            Date newDate = Date.from(date1.plusDays(difference).atStartOfDay(ZoneId.systemDefault()).toInstant());
                            System.out.println(newDate);
                            task.setRemainderDay(newDate);
                            remainderService.save(task);
                        });
                    }
                }
        }
    }

    public boolean compareDates(String today, String date2){
        String[] todaySplit = today.split("-");
        String[] date2Split = date2.split("-");
        if (Integer.parseInt(todaySplit[0]) >  Integer.parseInt(date2Split[0])){
            return true;
        } else if (Integer.parseInt(todaySplit[0]) <  Integer.parseInt(date2Split[0])){
            return false;
        } else {
            if (Integer.parseInt(todaySplit[1]) >  Integer.parseInt(date2Split[1])){
                return true;
            } else if (Integer.parseInt(todaySplit[1]) <  Integer.parseInt(date2Split[1])){
                return false;
            } else {
                return Integer.parseInt(todaySplit[2]) > Integer.parseInt(date2Split[2]);
            }
        }
    }

}
