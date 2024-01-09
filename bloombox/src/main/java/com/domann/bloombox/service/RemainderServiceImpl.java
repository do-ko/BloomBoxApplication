package com.domann.bloombox.service;

import com.domann.bloombox.dao.PlantDAO;
import com.domann.bloombox.dao.RemainderDAO;
import com.domann.bloombox.entity.Plant;
import com.domann.bloombox.entity.Remainder;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RemainderServiceImpl implements RemainderService{
    private RemainderDAO remainderDAO;

    @Autowired
    public RemainderServiceImpl(RemainderDAO remainderDAO) {
        this.remainderDAO = remainderDAO;
    }

    @Override
    public List<Remainder> findAllRemainders() {
        return remainderDAO.findAllRemainders();
    }

    @Override
    public Remainder findById(int id) {
        Remainder remainder = remainderDAO.findById(id);
        if (remainder == null){
            throw new RuntimeException("Did not find remainder with id: " + id);
        } else {
            return remainder;
        }
    }

    @Override
    public List<Remainder> findByPlantId(int plantId) {
        List<Remainder> remainders = remainderDAO.findByPlantId(plantId);
        if (remainders.isEmpty()){
            throw new RuntimeException("Did not find any remainders with plant id: " + plantId);
        } else {
            return remainders;
        }
    }

    @Override
    public List<Remainder> findByUserId(int userId) {
        List<Remainder> remainders = remainderDAO.findByUserId(userId);
        if (remainders.isEmpty()){
            throw new RuntimeException("Did not find any remainders with user id: " + userId);
        } else {
            return remainders;
        }
    }

    @Transactional
    @Override
    public Remainder save(Remainder remainder) {
        return remainderDAO.save(remainder);
    }

    @Transactional
    @Override
    public void deleteById(int id) {
        remainderDAO.deleteById(id);
    }
}
