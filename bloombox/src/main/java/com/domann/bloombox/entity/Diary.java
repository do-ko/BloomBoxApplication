package com.domann.bloombox.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "diaries")
public class Diary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "diary_id")
    private Integer diaryId;

    @Column(name = "plant_id")
    private Integer plantId;

    @Column(name = "title")
    private String title;

    @Column(name = "entry_date")
    private Date entryData;

    @Column(name = "image_url")
    private String imageUrl;

    public Diary() {
    }

    public Diary(Integer plantId, String title, Date entryData, String imageUrl) {
        this.plantId = plantId;
        this.title = title;
        this.entryData = entryData;
        this.imageUrl = imageUrl;
    }

    public Integer getDiaryId() {
        return diaryId;
    }

    public void setDiaryId(Integer diaryId) {
        this.diaryId = diaryId;
    }

    public Integer getPlantId() {
        return plantId;
    }

    public void setPlantId(Integer plantId) {
        this.plantId = plantId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Date getEntryData() {
        return entryData;
    }

    public void setEntryData(Date entryData) {
        this.entryData = entryData;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    @Override
    public String toString() {
        return "Diary{" +
                "diaryId=" + diaryId +
                ", plantId=" + plantId +
                ", title='" + title + '\'' +
                ", entryData=" + entryData +
                ", imageUrl='" + imageUrl + '\'' +
                '}';
    }
}
