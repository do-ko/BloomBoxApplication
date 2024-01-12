package com.domann.bloombox.rest;

import com.domann.bloombox.dao.LocationDAO;
import com.domann.bloombox.entity.Location;
import com.domann.bloombox.service.LocationService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/locations")
public class LocationRestController {

    private LocationService locationService;

    @Autowired
    public LocationRestController(LocationService locationService) {
        this.locationService = locationService;
    }

    @GetMapping("")
    public List<Location> findAll(){
        return locationService.findAll();
    }

    @GetMapping("/{locationId}")
    public Location findById(@PathVariable int locationId){
        Location location = locationService.findById(locationId);
        if (location==null){
            throw new LocationNotFoundException("Location id not found - " + locationId);
        }
        return location;
    }

    @GetMapping("user/{userId}")
    public List<Location> findByUserId(@PathVariable int userId){
        return locationService.findByUserId(userId);
    }

    @PostMapping("")
    public Location addLocation(@RequestBody Location location){
//        locationService.save()
        location.setLocationId(0);
        return locationService.save(location);
    }

    @PutMapping("")
    public Location updateLocation(@RequestBody Location location){
        return locationService.save(location);
    }

    @DeleteMapping("/{locationId}")
    public String deleteLocation(@PathVariable int locationId){
        Location location = locationService.findById(locationId);
        if (location==null){
            throw new LocationNotFoundException("Location id not found - " + locationId);
        }

        locationService.deleteById(locationId);

        return "Deleted location with id: " + locationId;
    }

//    private List<Location> locations;
//
//    @PostConstruct
//    public void loadData(){
//        locations = new ArrayList<>();
//        Location location1 = new Location("location1");
//        Location location2 = new Location("location2");
//        Location location3 = new Location("location3");
//        locations.add(location1);
//        locations.add(location2);
//        locations.add(location3);
//    }
//
//    @GetMapping("/locations")
//    public List<Location> getLocations(){
//        return locations;
//    }
//
//    @GetMapping("/locations/{locationId}")
//    public Location getLocationById(@PathVariable int locationId){
//        if (locationId >= locations.size() || locationId < 0){
//            throw new LocationNotFoundException("Student id not found - " + locationId);
//        }
//        return locations.get(locationId);
//    }

}
