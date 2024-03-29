package com.domann.bloombox.dao;

import com.domann.bloombox.entity.Location;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class LocationDAOImpl implements LocationDAO {

    private EntityManager entityManager;

    @Autowired
    public LocationDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public List<Location> findAllLocations() {
        TypedQuery<Location> query = entityManager.createQuery("FROM Location", Location.class);
        return query.getResultList();
    }

    @Override
    public Location findById(int id) {
        return entityManager.find(Location.class, id);
    }

    @Override
    public List<Location> findByUserId(int userId) {
        TypedQuery<Location> query = entityManager.createQuery("FROM Location WHERE userId=:id", Location.class);
        query.setParameter("id", userId);
        return query.getResultList();
    }

    @Override
    public Location save(Location location) {
        return entityManager.merge(location);
    }

    @Override
    public void deleteById(int id) {
        entityManager.remove(entityManager.find(Location.class, id));
    }
}
