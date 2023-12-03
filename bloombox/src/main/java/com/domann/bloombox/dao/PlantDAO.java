package com.domann.bloombox.dao;

import com.domann.bloombox.entity.Plant;

import java.util.List;

public interface PlantDAO {
    List<Plant> findAllPlants();

    Plant findById(int id);

    List<Plant> findByUserId(int userId);

    Plant save(Plant plant);

    void deleteById(int id);
}
