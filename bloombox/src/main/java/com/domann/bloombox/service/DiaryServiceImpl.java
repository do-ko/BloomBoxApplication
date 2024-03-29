package com.domann.bloombox.service;

import com.domann.bloombox.dao.DiaryDAO;
import com.domann.bloombox.entity.Diary;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DiaryServiceImpl implements DiaryService {
    private DiaryDAO diaryDAO;

    @Autowired
    public DiaryServiceImpl(DiaryDAO diaryDAO) {
        this.diaryDAO = diaryDAO;
    }

    @Override
    public List<Diary> findAllDiaries() {
        return diaryDAO.findAllDiaries();
    }

    @Override
    public Diary findById(int id) {
        Diary diary = diaryDAO.findById(id);
        if (diary == null) {
            throw new RuntimeException("Did not find diary with id: " + id);
        } else {
            return diary;
        }
    }

    @Override
    public List<Diary> findByPlantId(int plantId) {
        List<Diary> diaries = diaryDAO.findByPlantId(plantId);
        if (diaries.isEmpty()) {
            throw new RuntimeException("Did not find any diaries with plant id: " + plantId);
        } else {
            return diaries;
        }
    }

    @Transactional
    @Override
    public Diary save(Diary diary) {
        return diaryDAO.save(diary);
    }

    @Transactional
    @Override
    public void deleteById(int id) {
        diaryDAO.deleteById(id);
    }
}
