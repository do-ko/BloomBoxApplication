CREATE TABLE Users(
	user_id SERIAL UNIQUE,
	user_login VARCHAR(45) PRIMARY KEY,
	user_password VARCHAR(128)
);

CREATE TABLE Locations(
	user_id INTEGER REFERENCES Users(user_id) ON DELETE CASCADE NOT NULL,
	location_id SERIAL PRIMARY KEY,
	location_name VARCHAR(45) NOT NULL,
	light INTEGER NOT NULL CHECK (light IN (1,2,3,4,5)),
	water INTEGER NOT NULL CHECK (light IN (1,2,3,4,5)),
	image VARCHAR(2048)
);

CREATE TABLE Plants(
	user_id INTEGER REFERENCES Users(user_id) ON DELETE CASCADE NOT NULL,
	location_id INTEGER REFERENCES Locations(location_id) ON DELETE SET NULL,
	plant_id SERIAL PRIMARY KEY,
	plant_name VARCHAR(45) NOT NULL,
	species VARCHAR(45) NOT NULL,
	light INTEGER CHECK (light IN (1,2,3,4,5)),
	water INTEGER NOT NULL CHECK (water IN (1,2,3,4,5)),
	frequency INTEGER NOT NULL,
	image VARCHAR(2048)
);

CREATE TABLE Remainders(
	remainder_id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES Users(user_id) NOT NULL,
	plant_id INTEGER REFERENCES Plants(plant_id) ON DELETE CASCADE NOT NULL,
	plant_name VARCHAR(45) NOT NULL,
	remainder_type VARCHAR(50) NOT NULL,
	remainder_day DATE NOT NULL,
	done BOOLEAN DEFAULT False,
	done_date DATE DEFAULT NULL,
	failed BOOLEAN DEFAULT False
);

CREATE TABLE Diaries(
	diary_id SERIAL PRIMARY KEY,
	plant_id INTEGER REFERENCES Plants(plant_id) ON DELETE CASCADE NOT NULL,
	title VARCHAR(45) NOT NULL,
	entry_date DATE NOT NULL,
	image VARCHAR(2048),
	diary_content VARCHAR(10000)
);