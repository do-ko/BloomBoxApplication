package com.domann.bloombox.service;

import com.domann.bloombox.dao.PlantDAO;
import com.domann.bloombox.entity.Location;
import com.domann.bloombox.entity.Plant;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlantServiceImpl implements PlantService {
    private PlantDAO plantDAO;

    @Autowired
    public PlantServiceImpl(PlantDAO plantDAO) {
        this.plantDAO = plantDAO;
    }

    @Override
    public List<Plant> findAllPlants() {
        return plantDAO.findAllPlants();
    }

    @Override
    public Plant findById(int id) {
        Plant plant = plantDAO.findById(id);
        if (plant == null){
            throw new RuntimeException("Did not find plant with id: " + id);
        } else {
            return plant;
        }
    }

    @Override
    public List<Plant> findByUserId(int userId) {
        List<Plant> plants = plantDAO.findByUserId(userId);
//        if (plants.isEmpty()){
//            throw new RuntimeException("Did not find any plants with user id: " + userId);
//        } else {
//            return plants;
//        }
        return plants;
    }

    @Transactional
    @Override
    public Plant save(Plant plant) {
        return plantDAO.save(plant);
    }

    @Transactional
    @Override
    public void deleteById(int id) {
        plantDAO.deleteById(id);
    }
}
