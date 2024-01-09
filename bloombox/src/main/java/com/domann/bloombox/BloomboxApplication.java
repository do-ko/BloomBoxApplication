package com.domann.bloombox;

import com.domann.bloombox.dao.LocationDAOOutdated;
import com.domann.bloombox.entity.LocationOutdated;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.util.List;


@SpringBootApplication
@EnableScheduling
public class BloomboxApplication {

	public static void main(String[] args) {
		SpringApplication.run(BloomboxApplication.class, args);
	}








//
//	@Bean
//	public CommandLineRunner commandLineRunner(LocationDAOOutdated locationDAOOutdated){
//		return runner -> {
////			createLocation(locationDAO);
////			createLocation3(locationDAO);
//
////			readLocation(locationDAO);
//
////			readAllLocations(locationDAO);
////			readLocationByName(locationDAO);
//		};
//	}
//
//	private void readLocationByName(LocationDAOOutdated locationDAOOutdated){
//		LocationOutdated locationOutdated = locationDAOOutdated.findByLocationName("Bagno");
//		System.out.println(locationOutdated.toString());
//	}
//
//	private void readAllLocations(LocationDAOOutdated locationDAOOutdated){
//		List<LocationOutdated> locationOutdateds = locationDAOOutdated.getAllLocations();
//		for (LocationOutdated l: locationOutdateds) {
//			System.out.println(l.toString());
//		}
//	}
//
//	private void readLocation(LocationDAOOutdated locationDAOOutdated){
//		System.out.println("ID: 3");
//		LocationOutdated locationOutdated = locationDAOOutdated.findById(3);
//		System.out.println("Location:");
//		System.out.println(locationOutdated.toString());
//	}
//
//	private void createLocation(LocationDAOOutdated locationDAOOutdated){
//		System.out.println("CREATING");
//		LocationOutdated locationOutdated = new LocationOutdated("Wrocław");
//
//		System.out.println("SAVING");
//		locationDAOOutdated.save(locationOutdated);
//
//		System.out.println("PRINT ID: " + locationOutdated.getLocationId());
//
//	}
//
//	private void createLocation3(LocationDAOOutdated locationDAOOutdated){
//		System.out.println("CREATING");
//		LocationOutdated locationOutdated1 = new LocationOutdated("Warszawa");
//		LocationOutdated locationOutdated2 = new LocationOutdated("Bagno");
//		LocationOutdated locationOutdated3 = new LocationOutdated("Opole");
//
//		System.out.println("SAVING");
//		locationDAOOutdated.save(locationOutdated1);
//		locationDAOOutdated.save(locationOutdated2);
//		locationDAOOutdated.save(locationOutdated3);
//
//		System.out.println("PRINT ID: " + locationOutdated1.getLocationId());
//		System.out.println("PRINT ID: " + locationOutdated2.getLocationId());
//		System.out.println("PRINT ID: " + locationOutdated3.getLocationId());
//
//	}

}
