package com.domann.bloombox.rest;

import com.domann.bloombox.entity.Diary;
import com.domann.bloombox.service.DiaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/diaries")
public class DiaryRestController {
    private DiaryService diaryService;

    @Autowired
    public DiaryRestController(DiaryService diaryService) {
        this.diaryService = diaryService;
    }

    @GetMapping("")
    public List<Diary> findAll() {
        return diaryService.findAllDiaries();
    }

    @GetMapping("/{diaryId}")
    public Diary findById(@PathVariable int diaryId) {
        Diary diary = diaryService.findById(diaryId);
        if (diary == null) {
            throw new LocationNotFoundException("Diary id not found - " + diaryId);
        }
        return diary;
    }

    @GetMapping("/plant/{plantId}")
    public List<Diary> findByPlantId(@PathVariable int plantId) {
        List<Diary> diaries = diaryService.findByPlantId(plantId);
        if (diaries == null) {
            throw new LocationNotFoundException("Diaries with platId not found - " + plantId);
        }
        return diaries;
    }

    @PostMapping("")
    public Diary addDiary(@RequestBody Diary diary) {
        diary.setDiaryId(0);
        return diaryService.save(diary);
    }

    @PutMapping("")
    public Diary updateDiary(@RequestBody Diary diary) {
        return diaryService.save(diary);
    }

    @DeleteMapping("/{diaryId}")
    public String deleteDiary(@PathVariable int diaryId) {
        Diary diary = diaryService.findById(diaryId);
        if (diary == null) {
            throw new LocationNotFoundException("Diary id not found - " + diaryId);
        }

        diaryService.deleteById(diaryId);

        return "Deleted diary with id: " + diaryId;
    }
}
