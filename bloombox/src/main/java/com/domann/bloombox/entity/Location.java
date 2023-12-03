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

    @Column(name = "image_url")
    private String locationImageUrl;

    public Location() {
    }

    public Location(Integer userId, String locationName, String locationDescription, int light, String locationImageUrl) {
        this.userId = userId;
        this.locationName = locationName;
        this.locationDescription = locationDescription;
        this.light = light;
        this.locationImageUrl = locationImageUrl;
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

    public String getLocationImageUrl() {
        return locationImageUrl;
    }

    public void setLocationImageUrl(String locationImageUrl) {
        this.locationImageUrl = locationImageUrl;
    }

    @Override
    public String toString() {
        return "Location{" +
                "locationId=" + locationId +
                ", userId='" + userId + '\'' +
                ", locationName='" + locationName + '\'' +
                ", locationDescription='" + locationDescription + '\'' +
                ", light=" + light +
                ", locationImageUrl='" + locationImageUrl + '\'' +
                '}';
    }
}
