package com.domann.bloombox.dao;

import com.domann.bloombox.entity.Location;

import java.util.List;

public interface LocationDAO {

    List<Location> findAllLocations();

    Location findById(int id);

    List<Location> findByUserId(int userId);

    Location save(Location location);

    void deleteById(int id);
}
