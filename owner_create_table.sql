CREATE TABLE public.owner(
	owner_id serial PRIMARY KEY,
	name text NOT NULL,
	phone_number varchar(18) NOT NULL,
	address text
);

CREATE TABLE public.species(
	species_id serial PRIMARY KEY,
	name text NOT NULL
);

CREATE TABLE public.pet(
	pet_id serial UNIQUE NOT NULL,
	owner_id serial NOT NULL,
	species_id serial NOT NULL,
	name text NOT NULL,
	microchip_number varchar(15) NOT NULL,
	is_aggressive bool,
	is_neutered bool,
	birth_date date,
	
	CONSTRAINT pet_owner_fk FOREIGN KEY(owner_id) REFERENCES public.owner (owner_id),
	CONSTRAINT pet_species_fk FOREIGN KEY (species_id) REFERENCES public.species (species_id),
	
	CONSTRAINT pet_pk PRIMARY KEY(pet_id, owner_id, species_id),
	CONSTRAINT pet_chip_uk UNIQUE(microchip_number),
	CONSTRAINT pet_chip_length CHECK(LENGTH(microchip_number) = 15)
);

CREATE TABLE public.vaccine(
	vaccine_id serial PRIMARY KEY,
	name text NOT NULL,
	price numeric(5, 2) NOT NULL,
	time_period date NOT NULL,
	origin text
);

CREATE TABLE public.allergen(
	allergen_id serial PRIMARY KEY,
	name text NOT NULL
);

CREATE TABLE public.vaccination(
	vaccination_id serial NOT NULL,
	vaccine_id serial NOT NULL,
	vaccination_date date NOT NULL,
	
	CONSTRAINT vaccination_vaccine_fk FOREIGN KEY(vaccine_id) REFERENCES public.vaccine (vaccine_id),
	CONSTRAINT vaccination_id_pk PRIMARY KEY(vaccination_id, vaccine_id)
);

-- i made a mistake with vaccination relationship, i need to alter that table

ALTER TABLE public.vaccination
	ADD pet_id serial NOT NULL,
	ADD species_id serial NOT NULL,
	ADD owner_id serial NOT NULL,
	ADD CONSTRAINT vaccination_species_fk FOREIGN KEY (species_id) REFERENCES public.species (species_id),
	ADD CONSTRAINT vaccination_pet_fk FOREIGN KEY (pet_id) REFERENCES public.pet (pet_id),
	ADD CONSTRAINT vaccination_owner_fk FOREIGN KEY(owner_id) REFERENCES public.owner (owner_id),
	-- drop previous primary key
	DROP CONSTRAINT vaccination_id_pk,
	-- add the new correct one back
	ADD CONSTRAINT vaccination_id_pk PRIMARY KEY(vaccination_id, vaccine_id, pet_id, species_id, owner_id);
-- M-M relationship tables

CREATE TABLE public.reacts_to(
	pet_id serial NOT NULL,
	owner_id serial NOT NULL,
	species_id serial NOT NULL,
	allergen_id serial NOT NULL,
	
	CONSTRAINT reaction_owner_fk FOREIGN KEY(owner_id) REFERENCES public.owner (owner_id),
	CONSTRAINT reaction_species_fk FOREIGN KEY (species_id) REFERENCES public.species (species_id),
	CONSTRAINT reaction_pet_fk FOREIGN KEY (pet_id) REFERENCES public.pet (pet_id),
	CONSTRAINT reaction_allergen_fk FOREIGN KEY (allergen_id) REFERENCES public.allergen (allergen_id),
	CONSTRAINT reaction_uk UNIQUE(pet_id, owner_id, species_id, allergen_id),
	CONSTRAINT reaction_pk PRIMARY KEY(pet_id, owner_id, species_id, allergen_id)
);

CREATE TABLE public.vaccination_for(
	species_id serial NOT NULL,
	vaccine_id serial NOT NULL,
	
	CONSTRAINT vf_species_fk FOREIGN KEY(species_id) REFERENCES public.species (species_id),
	CONSTRAINT vf_vaccine_fk FOREIGN KEY(vaccine_id) REFERENCES public.vaccine (vaccine_id),
	CONSTRAINT vf_pk PRIMARY KEY(species_id, vaccine_id)
);

CREATE TABLE public.contains(
	allergen_id serial NOT NULL,
	vaccine_id serial NOT NULL,
	
	CONSTRAINT contains_allergen_fk FOREIGN KEY(allergen_id) REFERENCES public.allergen (allergen_id),
	CONSTRAINT contains_vaccine_fk FOREIGN KEY (vaccine_id) REFERENCES public.vaccine (vaccine_id),
	CONSTRAINT contains_pk PRIMARY KEY(allergen_id, vaccine_id)
);