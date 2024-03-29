# Description
BloomBox is a mobile application for IOS and Android devices that provides support for
plant caring. It will create reminders for user to let them know when is the right time to water
their plants. Users will be able to access their garden page, where all their plants are stored.
By navigating to the selected plant page, the user will access the diary section, where they
can browse their plant notes and write new entries to monitor their plant growth. Users can
also create locations with common settings that will make plant creation a quicker process,
while still giving users the option to specify custom settings if needed.

# Environmental Variables
## Backend
To connect to the database, create another .env file in /bloombox/src/main/resources following .env.example variable format and input variables.

Example of .env file:
```
DATABASE_URL="jdbc:postgresql://{host}:{port}/{database_name}"
DATABASE_LOGIN="postgres"
DATABASE_PASSWORD="password"
```

## Frontend
To enable comunication between frontend and backend, in /BloomBoxApp/src/config.js replace existing BASE_URL with your own.

Example of configuration:
```
 BASE_URL = "http://{host}:{port}/api";
```

By default host is your localhost address. To change it add server.address in application.properties file located in /bloombox/src/main/resources.
```
 server.address = x.x.x.x
```

# How to run
to start frontend application navigate to **BloomBoxApp** directory and run following command:
```
npm start
```
to start backend navigate to **bloombox** directory and run following command:
```
./mvnw spring-boot:run
```
to run tests on backend:
```
./mvnw test
```


# Mockup designs
![Welcome screen](https://github.com/do-ko/BloomBoxApplication/assets/93573650/205698f3-2322-45de-a96b-5a2f5a480af5)
![Garden screen](https://github.com/do-ko/BloomBoxApplication/assets/93573650/c40c11ac-9cb7-4cfd-b256-6d4162a5b99f)
![Locations screen](https://github.com/do-ko/BloomBoxApplication/assets/93573650/4711aa57-0caa-405d-9dc6-fbb589b44897)
![Add and edit plant screen](https://github.com/do-ko/BloomBoxApplication/assets/93573650/40f22e70-9d2f-4999-90a2-6e85a05a632a)
![Plant screen2](https://github.com/do-ko/BloomBoxApplication/assets/93573650/fd3cd733-2e74-49c9-8d52-b9149b71f486)
![Diary screen](https://github.com/do-ko/BloomBoxApplication/assets/93573650/000452a2-556d-46a1-8641-f236276dbd06)
