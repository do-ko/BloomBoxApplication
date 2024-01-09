package com.domann.bloombox.dao;

import com.domann.bloombox.entity.Plant;
import com.domann.bloombox.entity.Remainder;

import java.util.List;

public interface RemainderDAO {
    List<Remainder> findAllRemainders();

    Remainder findById(int id);

    List<Remainder> findByPlantId(int plantId);

    List<Remainder> findByUserId(int userId);

    Remainder save(Remainder remainder);

    void deleteById(int id);
}
