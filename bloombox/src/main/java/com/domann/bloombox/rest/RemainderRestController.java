package com.domann.bloombox.rest;

import com.domann.bloombox.entity.Plant;
import com.domann.bloombox.entity.Remainder;
import com.domann.bloombox.service.PlantService;
import com.domann.bloombox.service.RemainderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/remainders")
public class RemainderRestController {
    private RemainderService remainderService;

    @Autowired
    public RemainderRestController(RemainderService remainderService) {
        this.remainderService = remainderService;
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
        List<Remainder> remainders = remainderService.findByUserId(userId);
        if (remainders == null){
            throw new LocationNotFoundException("Remainders with userId not found - " + userId);
        }
        return remainders;
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
}
