package com.domann.bloombox.rest;

import com.domann.bloombox.entity.Location;
import com.domann.bloombox.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public List<Location> findAll() {
        return locationService.findAll();
    }

    @GetMapping("/{locationId}")
    public Location findById(@PathVariable int locationId) {
        Location location = locationService.findById(locationId);
        if (location == null) {
            throw new LocationNotFoundException("Location id not found - " + locationId);
        }
        return location;
    }

    @GetMapping("user/{userId}")
    public List<Location> findByUserId(@PathVariable int userId) {
        return locationService.findByUserId(userId);
    }

    @PostMapping("")
    public Location addLocation(@RequestBody Location location) {
//        locationService.save()
        location.setLocationId(0);
        return locationService.save(location);
    }

    @PutMapping("")
    public Location updateLocation(@RequestBody Location location) {
        return locationService.save(location);
    }

    @DeleteMapping("/{locationId}")
    public String deleteLocation(@PathVariable int locationId) {
        Location location = locationService.findById(locationId);
        if (location == null) {
            throw new LocationNotFoundException("Location id not found - " + locationId);
        }

        locationService.deleteById(locationId);

        return "Deleted location with id: " + locationId;
    }
}
