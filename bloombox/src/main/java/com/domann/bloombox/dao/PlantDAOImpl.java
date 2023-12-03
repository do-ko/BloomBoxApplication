package com.domann.bloombox.dao;

import com.domann.bloombox.entity.Location;
import com.domann.bloombox.entity.Plant;
import com.domann.bloombox.entity.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PlantDAOImpl implements PlantDAO{

    private EntityManager entityManager;

    @Autowired
    public PlantDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public List<Plant> findAllPlants() {
        TypedQuery<Plant> query = entityManager.createQuery("FROM Plant", Plant.class);
        return query.getResultList();
    }

    @Override
    public Plant findById(int id) {
        return entityManager.find(Plant.class, id);
    }

    @Override
    public List<Plant> findByUserId(int userId) {
        TypedQuery<Plant> query = entityManager.createQuery("FROM Plant WHERE userId=:id", Plant.class);
        query.setParameter("id", userId);
        return query.getResultList();
    }

    @Override
    public Plant save(Plant plant) {
        return entityManager.merge(plant);
    }

    @Override
    public void deleteById(int id) {
        entityManager.remove(entityManager.find(Plant.class, id));
    }
}
