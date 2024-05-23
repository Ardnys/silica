-- inserting dummy data
INSERT INTO public.owner
	(name, address, phone_number)
	VALUES
	('big ben', 'england street', '555 435 16 94'),
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
(1, 1, 'Buddy', '000000000000001', false, true, '2020-01-15'),
(2, 2, 'Whiskers', '000000000000002', false, true, '2019-05-23'),
(3, 3, 'Polly', '000000000000003', false, false, '2021-08-09'),
(4, 4, 'Nibbles', '000000000000004', false, false, '2022-03-17'),
(5, 5, 'Goldie', '000000000000005', false, false, '2020-11-30'),
(6, 6, 'Thumper', '000000000000006', false, true, '2018-02-14'),
(7, 7, 'Shelly', '000000000000007', false, false, '2017-06-20'),
(1, 8, 'Pip', '000000000000008', false, true, '2021-04-01'),
(2, 9, 'Bandit', '000000000000009', true, false, '2019-07-15'),
(3, 10, 'Rex', '000000000000010', true, true, '2022-12-05'),
(4, 11, 'Tweety', '000000000000011', false, false, '2019-09-25'),
(5, 12, 'Fluffy', '000000000000012', false, true, '2020-10-13');

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
(1, '2024-01-20', 13, 1, 1),  -- Buddy (Dog) - Owner 1
(2, '2024-02-10', 14, 2, 2),  -- Whiskers (Cat) - Owner 2
(3, '2024-03-05', 15, 3, 3),  -- Polly (Parrot) - Owner 3
(4, '2024-04-15', 16, 4, 4),  -- Nibbles (Hamster) - Owner 4
(5, '2024-05-20', 17, 5, 5),  -- Goldie (Goldfish) - Owner 5
(6, '2024-06-25', 18, 6, 6),  -- Thumper (Rabbit) - Owner 6
(1, '2024-07-05', 19, 7, 7),  -- Shelly (Turtle) - Owner 7
(2, '2024-08-10', 20, 8, 1),  -- Pip (Guinea Pig) - Owner 1
(3, '2024-09-15', 21, 9, 2),  -- Bandit (Ferret) - Owner 2
(4, '2024-10-20', 22, 10, 3),-- Rex (Lizard) - Owner 3
(5, '2024-11-25', 23, 11, 4),-- Tweety (Canary) - Owner 4
(6, '2024-12-30', 24, 12, 5);-- Fluffy (Chinchilla) - Owner 5





