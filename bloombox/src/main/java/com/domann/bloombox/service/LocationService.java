package com.domann.bloombox.service;

import com.domann.bloombox.entity.Location;

import java.util.List;

public interface LocationService {
    List<Location> findAll();

    Location findById(int id);

    List<Location> findByUserId(int userId);

    Location save(Location location);

    void deleteById(int id);
}
