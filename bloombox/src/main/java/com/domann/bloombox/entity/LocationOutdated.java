package com.domann.bloombox.entity;


import jakarta.persistence.*;

@Entity
@Table(name = "locations")
public class LocationOutdated {

//    FIELDS:
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "location_id")
    private int locationId;

    @Column(name = "location_name")
    private String locationName;

//    CONSTRUCTORS

    public LocationOutdated(){

    }
    public LocationOutdated(String locationName) {
        this.locationName = locationName;
    }

//    GETTERS AND SETTERS


    public int getLocationId() {
        return locationId;
    }

    public void setLocationId(int locationId) {
        this.locationId = locationId;
    }

    public String getLocationName() {
        return locationName;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }

//    TO STRING()

    @Override
    public String toString() {
        return "Location{" +
                "locationId=" + locationId +
                ", locationName='" + locationName + '\'' +
                '}';
    }
}