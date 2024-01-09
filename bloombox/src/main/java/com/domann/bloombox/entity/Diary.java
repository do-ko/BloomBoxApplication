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
    private Date entryDate;

    @Column(name = "image")
    private String image;

    @Column(name = "diary_content")
    private String diaryContent;

    public Diary() {
    }

    public Diary(Integer plantId, String title, Date entryDate, String image, String diaryContent) {
        this.plantId = plantId;
        this.title = title;
        this.entryDate = entryDate;
        this.image = image;
        this.diaryContent = diaryContent;
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

    public Date getEntryDate() {
        return entryDate;
    }

    public void setEntryDate(Date entryDate) {
        this.entryDate = entryDate;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getDiaryContent() {
        return diaryContent;
    }

    public void setDiaryContent(String diaryContent) {
        this.diaryContent = diaryContent;
    }

    @Override
    public String toString() {
        return "Diary{" +
                "diaryId=" + diaryId +
                ", plantId=" + plantId +
                ", title='" + title + '\'' +
                ", entryDate=" + entryDate +
                ", image='" + image + '\'' +
                ", diaryContent='" + diaryContent + '\'' +
                '}';
    }
}
