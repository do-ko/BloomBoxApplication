package com.domann.bloombox.dao;

import com.domann.bloombox.entity.LocationOutdated;

import java.util.List;

public interface LocationDAOOutdated {

    void save(LocationOutdated locationOutdated);

    LocationOutdated findById(Integer id);

    List<LocationOutdated> getAllLocations();

    LocationOutdated findByLocationName(String locationName);
}
