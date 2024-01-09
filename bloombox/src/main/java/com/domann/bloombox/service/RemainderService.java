package com.domann.bloombox.service;

import com.domann.bloombox.entity.Remainder;

import java.util.List;

public interface RemainderService {
    List<Remainder> findAllRemainders();

    Remainder findById(int id);

    List<Remainder> findByPlantId(int plantId);

    List<Remainder> findByUserId(int userId);

    Remainder save(Remainder remainder);

    void deleteById(int id);
}
