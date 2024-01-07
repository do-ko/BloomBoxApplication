package com.domann.bloombox.rest;

import com.domann.bloombox.entity.Location;
import com.domann.bloombox.entity.Plant;
import com.domann.bloombox.entity.User;
import com.domann.bloombox.service.PlantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plants")
public class PlantRestController {

    private PlantService plantService;

    @Autowired
    public PlantRestController(PlantService plantService) {
        this.plantService = plantService;
    }

    @GetMapping("")
    public List<Plant> findAll(){
        return plantService.findAllPlants();
    }

    @GetMapping("user/{userId}")
    public List<Plant> findByLogin(@PathVariable int userId){
        List<Plant> plants = plantService.findByUserId(userId);
        if (plants == null){
            throw new LocationNotFoundException("Plant with userId not found - " + userId);
        }
        return plants;
    }

    @GetMapping("/{plantId}")
    public Plant findById(@PathVariable int plantId){
        Plant plant = plantService.findById(plantId);
        if (plant==null){
            throw new LocationNotFoundException("Plant id not found - " + plantId);
        }
        return plant;
    }

    @PostMapping("")
    public Plant addPlant(@RequestBody Plant plant){
        plant.setPlantId(0);
        return plantService.save(plant);
    }

    @PutMapping("")
    public Plant updatePlant(@RequestBody Plant plant){
        return plantService.save(plant);
    }

    @DeleteMapping("/{plantId}")
    public String deletePlant(@PathVariable int plantId){
        Plant plant = plantService.findById(plantId);
        if (plant==null){
            throw new LocationNotFoundException("Plant id not found - " + plantId);
        }

        plantService.deleteById(plantId);

        return "Deleted plant with id: " + plantId;
    }

}
