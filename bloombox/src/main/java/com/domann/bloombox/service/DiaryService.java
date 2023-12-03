package com.domann.bloombox.service;

import com.domann.bloombox.entity.Diary;

import java.util.List;

public interface DiaryService {
    List<Diary> findAllDiaries();

    Diary findById(int id);

    List<Diary> findByPlantId(int plantId);

    Diary save(Diary diary);

    void deleteById(int id);
}
