package com.domann.bloombox.dao;

import com.domann.bloombox.entity.Plant;
import com.domann.bloombox.entity.Remainder;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RemainderDAOImpl implements  RemainderDAO{

    private EntityManager entityManager;
    @Autowired
    public RemainderDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public List<Remainder> findAllRemainders() {
        TypedQuery<Remainder> query = entityManager.createQuery("FROM Remainder", Remainder.class);
        return query.getResultList();
    }

    @Override
    public Remainder findById(int id) {
        return entityManager.find(Remainder.class, id);
    }

    @Override
    public List<Remainder> findByPlantId(int plantId) {
        TypedQuery<Remainder> query = entityManager.createQuery("FROM Remainder WHERE plantId=:id", Remainder.class);
        query.setParameter("id", plantId);
        return query.getResultList();
    }

    @Override
    public List<Remainder> findByUserId(int userId) {
        TypedQuery<Remainder> query = entityManager.createQuery("FROM Remainder WHERE userId=:id", Remainder.class);
        query.setParameter("id", userId);
        return query.getResultList();
    }

    @Override
    public Remainder save(Remainder remainder) {
        return entityManager.merge(remainder);
    }

    @Override
    public void deleteById(int id) {
        entityManager.remove(entityManager.find(Remainder.class, id));
    }
}
