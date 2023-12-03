package com.domann.bloombox.dao;

import com.domann.bloombox.entity.Diary;
import com.domann.bloombox.entity.Location;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class DiaryDAOImpl implements DiaryDAO{

    private EntityManager entityManager;

    @Autowired
    public DiaryDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public List<Diary> findAllDiaries() {
        TypedQuery<Diary> query = entityManager.createQuery("FROM Diary ", Diary.class);
        return query.getResultList();
    }

    @Override
    public Diary findById(int id) {
        return entityManager.find(Diary.class, id);
    }

    @Override
    public List<Diary> findByPlantId(int plantId) {
        TypedQuery<Diary> query = entityManager.createQuery("FROM Diary WHERE plantId=:id", Diary.class);
        query.setParameter("id", plantId);
        return query.getResultList();
    }

    @Override
    public Diary save(Diary diary) {
        return entityManager.merge(diary);
    }

    @Override
    public void deleteById(int id) {
        entityManager.remove(entityManager.find(Diary.class, id));
    }
}
