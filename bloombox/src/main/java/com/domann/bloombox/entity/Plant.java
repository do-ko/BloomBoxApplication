package com.domann.bloombox.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "Plants")
public class Plant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "plant_id")
    private Integer plantId;

    @Column(name = "location_id")
    private Integer locationId;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "plant_name")
    private String plantName;

    @Column(name = "species")
    private String species;

    @Column(name = "light")
    private Integer light;

    @Column(name = "water")
    private Integer water;

    @Column(name = "frequency")
    private Integer frequency;

    @Column(name = "image")
    private String image;
    public Plant() {
    }

    public Plant(Integer plantId, Integer locationId, String plantName, String species, Integer light, Integer water, Integer frequency, String image) {
        this.plantId = plantId;
        this.locationId = locationId;
        this.userId = userId;
        this.plantName = plantName;
        this.species = species;
        this.light = light;
        this.water = water;
        this.frequency = frequency;
        this.image = image;
    }

    public Integer getPlantId() {
        return plantId;
    }

    public void setPlantId(Integer plantId) {
        this.plantId = plantId;
    }

    public Integer getLocationId() {
        return locationId;
    }

    public void setLocationId(Integer locationId) {
        this.locationId = locationId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getPlantName() {
        return plantName;
    }

    public void setPlantName(String plantName) {
        this.plantName = plantName;
    }

    public String getSpecies() {
        return species;
    }

    public void setSpecies(String species) {
        this.species = species;
    }

    public Integer getLight() {
        return light;
    }

    public void setLight(Integer light) {
        this.light = light;
    }

    public Integer getWater() {
        return water;
    }

    public void setWater(Integer water) {
        this.water = water;
    }

    public Integer getFrequency() {
        return frequency;
    }

    public void setFrequency(Integer frequency) {
        this.frequency = frequency;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    @Override
    public String toString() {
        return "Plant{" +
                "plantId=" + plantId +
                ", locationId=" + locationId +
//                ", userId=" + userId +
                ", plantName='" + plantName + '\'' +
                ", species='" + species + '\'' +
                ", light=" + light +
                ", water=" + water +
                ", frequency=" + frequency +
                ", image='" + image + '\'' +
                '}';
    }
}
