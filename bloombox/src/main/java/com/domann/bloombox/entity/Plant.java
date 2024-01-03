package com.domann.bloombox.entity;

import jakarta.persistence.*;

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

    @Column(name = "image")
    private String image;

    public Plant() {
    }

    public Plant(Integer locationId, Integer userId, String plantName, String species, Integer light, Integer water, String image) {
        this.locationId = locationId;
        this.userId = userId;
        this.plantName = plantName;
        this.species = species;
        this.light = light;
        this.water = water;
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

    public String getImageUrl() {
        return image;
    }

    public void setImageUrl(String image) {
        this.image = image;
    }

    @Override
    public String toString() {
        return "Plant{" +
                "plantId=" + plantId +
                ", locationId=" + locationId +
                ", userId=" + userId +
                ", plantName='" + plantName + '\'' +
                ", species='" + species + '\'' +
                ", light=" + light +
                ", water=" + water +
                ", image='" + image + '\'' +
                '}';
    }
}
