package com.domann.bloombox.dao;

import com.domann.bloombox.entity.LocationOutdated;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class LocationDAOOutdatedOutdatedImpl implements LocationDAOOutdated {
//    entity manager field:

    private EntityManager entityManager;

//    inject entity manager:

    @Autowired
    public LocationDAOOutdatedOutdatedImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    @Transactional
    public void save(LocationOutdated locationOutdated) {
        entityManager.persist(locationOutdated);
    }

    @Override
    public LocationOutdated findById(Integer id) {
        return entityManager.find(LocationOutdated.class, id);
    }

    @Override
    public List<LocationOutdated> getAllLocations() {
        TypedQuery<LocationOutdated> query = entityManager.createQuery("FROM LocationOutdated", LocationOutdated.class);
        return query.getResultList();
    }

    @Override
    public LocationOutdated findByLocationName(String locationName) {
        TypedQuery<LocationOutdated> query = entityManager.createQuery("FROM LocationOutdated WHERE locationName=:name", LocationOutdated.class);

        query.setParameter("name", locationName);

        return query.getSingleResult();
    }
}
