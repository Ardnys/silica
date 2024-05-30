-- inserting dummy data
INSERT INTO public.owner
	(name, address, phone_number)
	VALUES
	('big ben', 'england street', '555 435 16 94'),
	('bruce', 'australia', '555 672 45 23'),
	('tony tim', 'taiwan', '352 956 29 77'),
	('post gre', 'db alley', '985 345 93 85'),
	('nice one', 'nice country', '958 985 14 85'),
	('pencil case', 'power street', '574 031 856 17'),
	('geoff', 'jeffy', '643 235 94 85');
	
INSERT INTO public.species (name) VALUES
('Dog'),
('Cat'),
('Parrot'),
('Hamster'),
('Goldfish'),
('Rabbit'),
('Turtle'),
('Guinea Pig'),
('Ferret'),
('Lizard'),
('Canary'),
('Chinchilla');

INSERT INTO public.pet (owner_id, species_id, name, microchip_number, is_aggressive, is_neutered, birth_date) VALUES
(13, 25, 'Buddy', '000000000000001', false, true, '2020-01-15'),
(14, 26, 'Whiskers', '000000000000002', false, true, '2019-05-23'),
(15, 27, 'Polly', '000000000000003', false, false, '2021-08-09'),
(16, 28, 'Nibbles', '000000000000004', false, false, '2022-03-17'),
(17, 29, 'Goldie', '000000000000005', false, false, '2020-11-30'),
(18, 30, 'Thumper', '000000000000006', false, true, '2018-02-14'),
(19, 31, 'Shelly', '000000000000007', false, false, '2017-06-20'),
(13, 32, 'Pip', '000000000000008', false, true, '2021-04-01'),
(14, 33, 'Bandit', '000000000000009', true, false, '2019-07-15'),
(15, 34, 'Rex', '000000000000010', true, true, '2022-12-05'),
(16, 35, 'Tweety', '000000000000011', false, false, '2019-09-25'),
(17, 36, 'Fluffy', '000000000000012', false, true, '2020-10-13');

INSERT INTO public.vaccine (name, price, time_period, origin) VALUES
('Rabies Vaccine', 49.99, '2024-01-01', 'USA'),
('Distemper Vaccine', 29.99, '2024-01-15', 'Germany'),
('Parvovirus Vaccine', 39.99, '2024-02-01', 'France'),
('Bordetella Vaccine', 24.99, '2024-02-15', 'UK'),
('Leptospirosis Vaccine', 34.99, '2024-03-01', 'Canada'),
('Feline Leukemia Vaccine', 44.99, '2024-03-15', 'Australia');

INSERT INTO public.allergen (name) VALUES
('Beef'),
('Chicken'),
('Dairy'),
('Wheat'),
('Soy'),
('Fish'),
('Lamb'),
('Eggs'),
('Corn'),
('Chocolate'),
('Grains'),
('Environmental Pollens');

INSERT INTO public.vaccination (vaccine_id, vaccination_date, pet_id, species_id, owner_id) VALUES
(1, '2024-01-20', 37, 25, 13),  -- Buddy (Dog) - Owner 1
(2, '2024-02-10', 38, 26, 14),  -- Whiskers (Cat) - Owner 2
(3, '2024-03-05', 39, 27, 15),  -- Polly (Parrot) - Owner 3
(4, '2024-04-15', 40, 28, 16),  -- Nibbles (Hamster) - Owner 4
(5, '2024-05-20', 41, 29, 17),  -- Goldie (Goldfish) - Owner 5
(6, '2024-06-25', 42, 30, 18),  -- Thumper (Rabbit) - Owner 6
(1, '2024-07-05', 43, 31, 19),  -- Shelly (Turtle) - Owner 7
(2, '2024-08-10', 44, 32, 13),  -- Pip (Guinea Pig) - Owner 1
(3, '2024-09-15', 45, 33, 14),  -- Bandit (Ferret) - Owner 2
(4, '2024-10-20', 46, 34, 15),-- Rex (Lizard) - Owner 3
(5, '2024-11-25', 47, 35, 16),-- Tweety (Canary) - Owner 4
(6, '2024-12-30', 48, 36, 17);-- Fluffy (Chinchilla) - Owner 5

-- (1-5)vaccines have one or more allergens. vaccine 6 doesn't
INSERT INTO public.contains (allergen_id, vaccine_id) VALUES
(1,1),
(2,1),
(3,1),
(4,2),
(5,2),
(6,3),
(7,3),
(8,4),
(9,4),
(10,5),
(11,5),
(12,5),
(1,5),
(2,5);

-- (25-34)pets reacts to one or more allergens. (35-36) doesn"t
INSERT INTO public.reacts_to (pet_id,owner_id, species_id, allergen_id) VALUES
(25,8,13,1),
(25,8,13,2),
(25,8,13,3),
(26,9,14,4),
(26,9,14,5),
(27,10,15,6),
(27,10,15,7),
(28,11,16,8),
(29,12,17,9),
(30,13,18,10),
(31,14,19,11),
(32,8,20,12),
(33,9,21,1),
(34,10,22,2),
(34,11,22,3);

-- there is at least one vaccine for every species
INSERT INTO public.vaccination_for (species_id, vaccine_id) VALUES
(13,1),
(13,2),
(13,3),
(13,4),
(14,1),
(14,2),
(14,3),
(14,4),
(14,5),
(15,2),
(15,3),
(16,3),
(16,4),
(16,5),
(17,5),
(18,2),
(18,3),
(19,1),
(19,6),
(20,1),
(20,4),
(21,4),
(21,5),
(22,5),
(22,6),
(23,1),
(23,3),
(24,1),
(24,4);






	

