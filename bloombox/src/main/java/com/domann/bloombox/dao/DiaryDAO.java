package com.domann.bloombox.dao;

import com.domann.bloombox.entity.Diary;
import com.domann.bloombox.entity.Location;

import java.util.List;

public interface DiaryDAO {
    List<Diary> findAllDiaries();

    Diary findById(int id);

    List<Diary> findByPlantId(int plantId);

    Diary save(Diary diary);

    void deleteById(int id);
}
