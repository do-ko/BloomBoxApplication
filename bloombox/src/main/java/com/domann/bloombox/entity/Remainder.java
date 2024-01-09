package com.domann.bloombox.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "Remainders")
public class Remainder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "remainder_id")
    private Integer remainderId;
    @Column(name = "plant_id")
    private Integer plantId;
    @Column(name = "plant_name")
    private String plantName;

    @Column(name = "user_id")
    private Integer userId;
    @Column(name = "remainder_type")
    private String remainderType;
    @Column(name = "remainder_day")
    private Date remainderDay;
    @Column(name = "done")
    private Boolean done;
    @Column(name = "done_date")
    private Date doneDate;

    public Remainder() {
    }

    public Remainder(Integer plantId, String plantName, Integer userId, String remainderType, Date remainderDay, Boolean done, Date doneDate) {
        this.plantId = plantId;
        this.plantName = plantName;
        this.userId = userId;
        this.remainderType = remainderType;
        this.remainderDay = remainderDay;
        this.done = done;
        this.doneDate = doneDate;
    }

    public Integer getRemainderId() {
        return remainderId;
    }

    public void setRemainderId(Integer remainderId) {
        this.remainderId = remainderId;
    }

    public Integer getPlantId() {
        return plantId;
    }

    public void setPlantId(Integer plantId) {
        this.plantId = plantId;
    }

    public String getPlantName() {
        return plantName;
    }

    public void setPlantName(String plantName) {
        this.plantName = plantName;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getRemainderType() {
        return remainderType;
    }

    public void setRemainderType(String remainderType) {
        this.remainderType = remainderType;
    }

    public Date getRemainderDay() {
        return remainderDay;
    }

    public void setRemainderDay(Date remainderDay) {
        this.remainderDay = remainderDay;
    }

    public Boolean getDone() {
        return done;
    }

    public void setDone(Boolean done) {
        this.done = done;
    }

    public Date getDoneDate() {
        return doneDate;
    }

    public void setDoneDate(Date doneDate) {
        this.doneDate = doneDate;
    }

    @Override
    public String toString() {
        return "Remainder{" +
                "remainderId=" + remainderId +
                ", plantId=" + plantId +
                ", plantName=" + plantName +
                ", userId=" + userId +
                ", remainderType='" + remainderType + '\'' +
                ", remainderDay=" + remainderDay +
                ", done=" + done +
                ", doneDate=" + doneDate +
                '}';
    }
}
