\c vetdb


INSERT INTO vaccine (vaccine_id, name, price, time_period, origin) VALUES
(1, 'Rabies Vaccine', 49.99, 3, 'USA'),
(2, 'Distemper Vaccine', 29.99, 6, 'Germany'),
(3, 'Parvovirus Vaccine', 39.99, 2, 'France'),
(4, 'Bordetella Vaccine', 24.99, 4, 'UK'),
(5, 'Leptospirosis Vaccine', 34.99, 12, 'Canada'),
(6, 'Feline Leukemia Vaccine', 44.99, 6, 'Australia');

INSERT INTO allergen (allergen_id, name) VALUES
(1, 'Beef'),
(2, 'Chicken'),
(3, 'Dairy'),
(4, 'Wheat'),
(5, 'Soy'),
(6, 'Fish'),
(7, 'Lamb'),
(8, 'Eggs'),
(9, 'Corn'),
(10, 'Chocolate'),
(11, 'Grains'),
(12, 'Environmental Pollens');

INSERT INTO vaccination (vaccination_id, vaccine_id, vaccination_date, pet_id, species_id, owner_id) VALUES
(1, 1, '2024-01-20', 1, 1, 1),  -- Buddy (Dog) - Owner 1
(2, 2, '2024-02-10', 2, 2, 2),  -- Whiskers (Cat) - Owner 2
(3, 3, '2024-03-05', 3, 3, 3),  -- Polly (Parrot) - Owner 3
(4, 4, '2024-04-15', 4, 4, 4),  -- Nibbles (Hamster) - Owner 4
(5, 5, '2024-05-20', 5, 5, 5),  -- Goldie (Goldfish) - Owner 5
(6, 6, '2024-06-25', 6, 6, 6),  -- Thumper (Rabbit) - Owner 6
(7, 1, '2024-07-05', 7, 7, 7),  -- Shelly (Turtle) - Owner 7
(8, 2, '2024-08-10', 8, 8, 1),  -- Pip (Guinea Pig) - Owner 1
(9, 3, '2024-09-15', 9, 9, 2),  -- Bandit (Ferret) - Owner 2
(10, 4, '2024-10-20', 10, 10, 3), -- Rex (Lizard) - Owner 3
(11, 5, '2024-11-25', 11, 11, 4), -- Tweety (Canary) - Owner 4
(12, 6, '2024-12-30', 12, 12, 5); -- Fluffy (Chinchilla) - Owner 5

-- (1-5)vaccines have one or more allergens. vaccine 6 doesn't
INSERT INTO contains (allergen_id, vaccine_id) VALUES
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

-- (1-12)pets reacts to one or more allergens. (13-14) doesn"t
INSERT INTO reacts_to (pet_id,owner_id, species_id, allergen_id) VALUES
(1,1,1,1),
(1,1,1,2),
(1,1,1,3),
(2,2,2,4),
(2,2,2,5),
(3,3,3,6),
(3,3,3,7),
(4,4,4,8),
(5,5,5,9),
(6,6,6,10),
(7,7,7,11),
(8,1,8,12),
(9,2,9,1),
(10,3,10,2),
(10,4,10,3);

-- there is at least one vaccine for every species
INSERT INTO vaccination_for (species_id, vaccine_id) VALUES
(1,1),
(1,2),
(1,3),
(1,4),
(2,1),
(2,2),
(2,3),
(2,4),
(2,5),
(3,2),
(3,3),
(4,3),
(4,4),
(4,5),
(5,5),
(6,2),
(6,3),
(7,1),
(7,6),
(8,1),
(8,4),
(9,4),
(9,5),
(10,5),
(10,6),
(11,1),
(11,3),
(12,1),
(12,4);