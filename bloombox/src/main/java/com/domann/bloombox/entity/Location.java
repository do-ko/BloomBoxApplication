package com.domann.bloombox.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "locations")
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "location_id")
    private int locationId;
    @Column(name = "user_id")
    private Integer userId;
    @Column(name = "location_name")
    private String locationName;
    @Column(name = "description")
    private String locationDescription;

    @Column(name = "light")
    private int light;

    @Column(name = "water")
    private int water;

    @Column(name = "image")
    private String locationImage;

    public Location() {
    }

    public Location(Integer userId, String locationName, String locationDescription, int water, int light, String locationImage) {
        this.userId = userId;
        this.locationName = locationName;
        this.locationDescription = locationDescription;
        this.light = light;
        this.water = water;
        this.locationImage = locationImage;
    }

    public int getLocationId() {
        return locationId;
    }

    public void setLocationId(int locationId) {
        this.locationId = locationId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserID(Integer userId) {
        this.userId = userId;
    }

    public String getLocationName() {
        return locationName;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }

    public String getLocationDescription() {
        return locationDescription;
    }

    public void setLocationDescription(String locationDescription) {
        this.locationDescription = locationDescription;
    }

    public int getLight() {
        return light;
    }

    public void setLight(int light) {
        this.light = light;
    }

    public int getWater() {
        return water;
    }

    public void setWater(int water) {
        this.water = water;
    }
    public String getLocationImage() {
        return locationImage;
    }

    public void setLocationImage(String locationImage) {
        this.locationImage = locationImage;
    }

    @Override
    public String toString() {
        return "Location{" +
                "locationId=" + locationId +
                ", userId=" + userId +
                ", locationName='" + locationName + '\'' +
                ", locationDescription='" + locationDescription + '\'' +
                ", light=" + light +
                ", water=" + water +
                ", locationImage='" + locationImage + '\'' +
                '}';
    }

}
