CREATE DATABASE vetdb;

\c vetdb


CREATE TABLE owner(
	owner_id serial PRIMARY KEY,
	name text NOT NULL,
	phone_number varchar(18) NOT NULL,
	address text
);

CREATE TABLE species(
	species_id serial PRIMARY KEY,
	name text NOT NULL
);

CREATE TABLE pet(
	pet_id serial UNIQUE NOT NULL,
	owner_id serial NOT NULL,
	species_id serial NOT NULL,
	name text NOT NULL,
	microchip_number varchar(15) NOT NULL,
	is_aggressive bool,
	is_neutered bool,
	birth_date date,
	
	CONSTRAINT pet_owner_fk FOREIGN KEY(owner_id) REFERENCES owner (owner_id),
	CONSTRAINT pet_species_fk FOREIGN KEY (species_id) REFERENCES species (species_id),
	
	CONSTRAINT pet_pk PRIMARY KEY(pet_id, owner_id, species_id),
	CONSTRAINT pet_chip_uk UNIQUE(microchip_number),
	CONSTRAINT pet_chip_length CHECK(LENGTH(microchip_number) = 15)
);

CREATE TABLE vaccine(
	vaccine_id serial PRIMARY KEY,
	name text NOT NULL,
	price numeric(5, 2) NOT NULL,
	time_period INTEGER NOT NULL,
	origin text
);

CREATE TABLE allergen(
	allergen_id serial PRIMARY KEY,
	name text NOT NULL
);

CREATE TABLE vaccination(
	vaccination_id serial NOT NULL,
	vaccine_id serial NOT NULL,
	vaccination_date date NOT NULL,
	
	CONSTRAINT vaccination_vaccine_fk FOREIGN KEY(vaccine_id) REFERENCES vaccine (vaccine_id),
	CONSTRAINT vaccination_id_pk PRIMARY KEY(vaccination_id, vaccine_id)
);

-- i made a mistake with vaccination relationship, i need to alter that table

ALTER TABLE vaccination
	ADD pet_id serial NOT NULL,
	ADD species_id serial NOT NULL,
	ADD owner_id serial NOT NULL,
	ADD CONSTRAINT vaccination_species_fk FOREIGN KEY (species_id) REFERENCES species (species_id),
	ADD CONSTRAINT vaccination_pet_fk FOREIGN KEY (pet_id) REFERENCES pet (pet_id),
	ADD CONSTRAINT vaccination_owner_fk FOREIGN KEY(owner_id) REFERENCES owner (owner_id),
	-- drop previous primary key
	DROP CONSTRAINT vaccination_id_pk,
	-- add the new correct one back
	ADD CONSTRAINT vaccination_id_pk PRIMARY KEY(vaccination_id, vaccine_id, pet_id, species_id, owner_id);
-- M-M relationship tables

CREATE TABLE reacts_to(
	pet_id serial NOT NULL,
	owner_id serial NOT NULL,
	species_id serial NOT NULL,
	allergen_id serial NOT NULL,
	
	CONSTRAINT reaction_owner_fk FOREIGN KEY(owner_id) REFERENCES owner (owner_id),
	CONSTRAINT reaction_species_fk FOREIGN KEY (species_id) REFERENCES species (species_id),
	CONSTRAINT reaction_pet_fk FOREIGN KEY (pet_id) REFERENCES pet (pet_id),
	CONSTRAINT reaction_allergen_fk FOREIGN KEY (allergen_id) REFERENCES allergen (allergen_id),
	CONSTRAINT reaction_uk UNIQUE(pet_id, owner_id, species_id, allergen_id),
	CONSTRAINT reaction_pk PRIMARY KEY(pet_id, owner_id, species_id, allergen_id)
);

CREATE TABLE vaccination_for(
	species_id serial NOT NULL,
	vaccine_id serial NOT NULL,
	
	CONSTRAINT vf_species_fk FOREIGN KEY(species_id) REFERENCES species (species_id),
	CONSTRAINT vf_vaccine_fk FOREIGN KEY(vaccine_id) REFERENCES vaccine (vaccine_id),
	CONSTRAINT vf_pk PRIMARY KEY(species_id, vaccine_id)
);

CREATE TABLE contains(
	allergen_id serial NOT NULL,
	vaccine_id serial NOT NULL,
	
	CONSTRAINT contains_allergen_fk FOREIGN KEY(allergen_id) REFERENCES allergen (allergen_id),
	CONSTRAINT contains_vaccine_fk FOREIGN KEY (vaccine_id) REFERENCES vaccine (vaccine_id),
	CONSTRAINT contains_pk PRIMARY KEY(allergen_id, vaccine_id)
);

-- setting time periods of vaccines in months
UPDATE vaccine
SET time_period = CASE
    WHEN vaccine_id = 1 THEN 3
    WHEN vaccine_id = 2 THEN 6
    WHEN vaccine_id = 3 THEN 2
    WHEN vaccine_id = 4 THEN 4
    WHEN vaccine_id = 5 THEN 12
    WHEN vaccine_id = 6 THEN 6
END