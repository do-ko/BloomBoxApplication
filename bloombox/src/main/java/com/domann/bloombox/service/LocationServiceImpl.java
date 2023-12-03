package com.domann.bloombox.service;

import com.domann.bloombox.dao.LocationDAO;
import com.domann.bloombox.dao.LocationRepository;
import com.domann.bloombox.entity.Location;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LocationServiceImpl implements LocationService{
    private LocationDAO locationDAO;
//    private LocationRepository locationRepository;

    @Autowired
    public LocationServiceImpl(LocationDAO locationDAO) {
        this.locationDAO = locationDAO;
    }

    @Override
    public List<Location> findAll() {
        return locationDAO.findAllLocations();
    }

    @Override
    public Location findById(int id) {
        Location location = locationDAO.findById(id);
        if (location == null){
            throw new RuntimeException("Did not find location with id: " + id);
        } else {
            return location;
        }
    }

    @Override
    public List<Location> findByUserId(int userId) {
        List<Location> locations = locationDAO.findByUserId(userId);
        if (locations.isEmpty()){
            throw new RuntimeException("Did not find any locations with user id: " + userId);
        } else {
            return locations;
        }

    }

    @Transactional
    @Override
    public Location save(Location location) {
        return locationDAO.save(location);
    }

    @Transactional
    @Override
    public void deleteById(int id) {
        locationDAO.deleteById(id);
    }
}
