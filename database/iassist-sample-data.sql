INSERT INTO users VALUES (918190694, "John", "Le", "jle17@mail.sfsu.edu", "john", null, "S");
INSERT INTO users VALUES (918190872, 'Mary', 'Jane', 'mary@mail.sfsu.edu', 'mary', null, 'S');
INSERT INTO users VALUES (918190783, 'Ben', 'Frank', 'ben@mail.sfsu.edu', 'ben', null, 'S');
INSERT INTO users VALUES (918190543, 'Carrie', 'Shoemaker', 'carrie@mail.sfsu.edu', 'carrie', null, 'S');
INSERT INTO users VALUES (918190111, 'Melody', 'Morrison', 'ben@mail.sfsu.edu', 'ben', null, 'S');
INSERT INTO users VALUES (918190436, 'Sventavic', 'Frank', 'sventavic@mail.sfsu.edu', 'sventavic', null, 'S');
INSERT INTO users VALUES (918190234, 'Leonardo', 'DiCaprio', 'leonardo@mail.sfsu.edu', 'leonardo', null, 'S');
INSERT INTO users VALUES (918190698, 'Charles', 'Tuttle', 'charles@mail.sfsu.edu', 'charles', null, 'S');
INSERT INTO users VALUES (918190929, 'Edward', 'Lank', 'edward@mail.sfsu.edu', 'edward', null, 'S');
INSERT INTO users VALUES (918190032, 'Robert', 'Douglas', 'robert@mail.sfsu.edu', 'robert', null, 'S');
INSERT INTO users VALUES (918190471, 'Barry', 'Levine', 'barry@mail.sfsu.edu', 'barry', null, 'S');

INSERT INTO users VALUES (900000001, 'Arno', 'Puder', 'arno@sfsu.edu', 'arno', 'https://zoom.com/arno', 'F');
INSERT INTO users VALUES (900000002, 'Hui', 'Yang', 'hui@sfsu.edu', 'hui', 'https://zoom.com/hui', 'F');
INSERT INTO users VALUES (900000003, 'Bill', 'Hsu', 'bill@sfsu.edu', 'bill', 'https://zoom.com/bill', 'F');
INSERT INTO users VALUES (900000004, 'Abeer', 'AlJarrah', 'abeer@sfsu.edu', 'abeer', 'https://zoom.com/abeer', 'F');
INSERT INTO users VALUES (900000005, 'Jozo', 'Dujmovic', 'jozo@sfsu.edu', 'jozo', 'https://zoom.com/jozo', 'F');
INSERT INTO users VALUES (900000006, 'Pooyan', 'Fazli', 'pooyan@sfsu.edu', 'pooyan', 'https://zoom.com/pooyan', 'F');
INSERT INTO users VALUES (900000007, 'Shah', 'Humayoun', 'shah@sfsu.edu', 'shah', 'https://zoom.com/shah', 'F');
INSERT INTO users VALUES (900000008, 'Anagha', 'Kulkarni', 'anagha@sfsu.edu', 'anagha', 'https://zoom.com/anagha', 'F');
INSERT INTO users VALUES (900000009, 'Kaz', 'Okada', 'kaz@sfsu.edu', 'kaz', 'https://zoom.com/kaz', 'F');
INSERT INTO users VALUES (900000010, 'Dragutin', 'Petkovic', 'dragutin@sfsu.edu', 'dragutin', 'https://zoom.com/dragutin', 'F');
INSERT INTO users VALUES (900000011, 'Rahul', 'Singh', 'rahul@sfsu.edu', 'rahul', 'https://zoom.com/rahul', 'F');
INSERT INTO users VALUES (900000012, 'Isabel', 'Song', 'isabel@sfsu.edu', 'isabel', 'https://zoom.com/isabel', 'F');
INSERT INTO users VALUES (900000013, 'Jingyi', 'Wang', 'jingyi@sfsu.edu', 'jingyi', 'https://zoom.com/jingyi', 'F');
INSERT INTO users VALUES (900000014, 'James', 'Wong', 'james@sfsu.edu', 'james', 'https://zoom.com/james', 'F');
INSERT INTO users VALUES (900000015, 'Ilmi', 'Yoon', 'ilmi@sfsu.edu', 'ilmi', 'https://zoom.com/ilmi', 'F');
INSERT INTO users VALUES (900000016, 'Hao', 'Yue', 'hao@sfsu.edu', 'hao', 'https://zoom.com/hao', 'F');

INSERT INTO `appointments` VALUES (1, 'UG', '1601415000', '1601415900', 918190694, 900000005, 'Sample Student Notes 1', 'Sample Faculty Notes 1', FALSE, FALSE, TRUE);
INSERT INTO `appointments` VALUES (2, 'TR', '1601415000', '1601415900', 918190694, 900000003, 'Sample Student Notes 2', 'Sample Faculty Notes 2', FALSE, TRUE, TRUE);
INSERT INTO `appointments` VALUES (3, 'PR', '1601415000', '1601415900', 918190694, 900000001, 'Sample Student Notes 3', NULL, FALSE, FALSE, FALSE);
INSERT INTO `appointments` VALUES (4, 'UG','1601415000',  '1601415900', 918190694, 900000007, 'Sample Student Notes 4', NULL, FALSE, FALSE, FALSE);
INSERT INTO `appointments` VALUES (5, 'TR','1601415000',  '1601415900', 918190694, 900000003, 'Sample Student Notes 5', NULL, FALSE, FALSE, FALSE);
INSERT INTO `appointments` VALUES (6, 'GR','1601415000',  '1601415900', 918190694, 900000002, 'Sample Student Notes 6', NULL, FALSE, FALSE, FALSE);
INSERT INTO `appointments` VALUES (7, 'UG','1601415000',  '1601415900', 918190783, 900000006, 'Sample Student Notes 7', NULL, FALSE, FALSE,  FALSE);
INSERT INTO `appointments` VALUES (8, 'GR','1601415000',  '1601415900', 918190543, 900000002, 'Sample Student Notes 8', NULL, FALSE, FALSE,  FALSE);

/* Arno Tuesday 2-3 */
INSERT INTO `schedules` VALUES (1, 900000001, 'PR', 2, "1400", "1415"); 
INSERT INTO `schedules` VALUES (2, 900000001, 'PR', 2, "1415", "1430"); 
INSERT INTO `schedules` VALUES (3, 900000001, 'PR', 2, "1430", "1445"); 
INSERT INTO `schedules` VALUES (4, 900000001, 'PR', 2, "1445", "1500"); 

/* Arno Wednesday 1-2 */
INSERT INTO `schedules` VALUES (5, 900000001, 'PR', 3, "1300", "1315"); 
INSERT INTO `schedules` VALUES (6, 900000001, 'PR', 3, "1315", "1330"); 
INSERT INTO `schedules` VALUES (7, 900000001, 'PR', 3, "1330", "1345"); 
INSERT INTO `schedules` VALUES (8, 900000001, 'PR', 3, "1345", "1400"); 

/* Arno Thursday 1-2 */
INSERT INTO `schedules` VALUES (9,   900000001, 'PR', 4, "1300", "1315"); 
INSERT INTO `schedules` VALUES (10, 900000001, 'PR', 4, "1315", "1330"); 
INSERT INTO `schedules` VALUES (11, 900000001, 'PR', 4, "1330", "1345"); 
INSERT INTO `schedules` VALUES (12, 900000001, 'PR', 4, "1345", "1400"); 

/* Abeer Monday 4-5 */
INSERT INTO `schedules` VALUES (13, 900000004, 'UG', 1, "1600", "1615"); 
INSERT INTO `schedules` VALUES (14, 900000004, 'UG', 1, "1615", "1630"); 
INSERT INTO `schedules` VALUES (15, 900000004, 'UG', 1, "1630", "1645"); 
INSERT INTO `schedules` VALUES (16, 900000004, 'UG', 1, "1645", "1700"); 

/* Abeer Wednesday 4-5 */
INSERT INTO `schedules` VALUES (17, 900000004, 'UG', 3, "1600", "1615"); 
INSERT INTO `schedules` VALUES (18, 900000004, 'UG', 3, "1615", "1630"); 
INSERT INTO `schedules` VALUES (19, 900000004, 'UG', 3, "1630", "1645"); 
INSERT INTO `schedules` VALUES (20, 900000004, 'UG', 3, "1645", "1700"); 


/* Jozo Tuesday 10-11 */
INSERT INTO `schedules` VALUES (21, 900000005, 'UG', 2, "1000", "1015"); 
INSERT INTO `schedules` VALUES (22, 900000005, 'UG', 2, "1015", "1030"); 
INSERT INTO `schedules` VALUES (23, 900000005, 'UG', 2, "1030", "1045"); 
INSERT INTO `schedules` VALUES (24, 900000005, 'UG', 2, "1045", "1100"); 

/* Jozo Thursday 10-11 */
INSERT INTO `schedules` VALUES (25, 900000005, 'UG', 4, "1000", "1015"); 
INSERT INTO `schedules` VALUES (26, 900000005, 'UG', 4, "1015", "1030"); 
INSERT INTO `schedules` VALUES (27, 900000005, 'UG', 4, "1030", "1045"); 
INSERT INTO `schedules` VALUES (28, 900000005, 'UG', 4, "1045", "1100"); 


/* Pooyan Friday 3-4 */
INSERT INTO `schedules` VALUES (29, 900000006, 'UG', 5, "1500", "1515"); 
INSERT INTO `schedules` VALUES (30, 900000006, 'UG', 5, "1515", "1530"); 
INSERT INTO `schedules` VALUES (31, 900000006, 'UG', 5, "1530", "1545"); 
INSERT INTO `schedules` VALUES (32, 900000006, 'UG', 5, "1545", "1600"); 


/* Bill Tuesday 3-4 */
INSERT INTO `schedules` VALUES (33, 900000003, 'UG', 2, "1500", "1515"); 
INSERT INTO `schedules` VALUES (34, 900000003, 'UG', 2, "1515", "1530"); 
INSERT INTO `schedules` VALUES (35, 900000003, 'UG', 2, "1530", "1545"); 
INSERT INTO `schedules` VALUES (36, 900000003, 'UG', 2, "1545", "1600"); 

/* Bill Thursday 3-4 */
INSERT INTO `schedules` VALUES (37, 900000003, 'UG', 4, "1500", "1515"); 
INSERT INTO `schedules` VALUES (38, 900000003, 'UG', 4, "1515", "1530"); 
INSERT INTO `schedules` VALUES (39, 900000003, 'UG', 4, "1530", "1545"); 
INSERT INTO `schedules` VALUES (40, 900000003, 'UG', 4, "1545", "1600"); 

/* Shah Monday 9-10 */
INSERT INTO `schedules` VALUES (41, 900000007, 'UG', 1, "0900", "0915"); 
INSERT INTO `schedules` VALUES (42, 900000007, 'UG', 1, "0915", "0930"); 
INSERT INTO `schedules` VALUES (43, 900000007, 'UG', 1, "0930", "0945"); 
INSERT INTO `schedules` VALUES (44, 900000007, 'UG', 1, "0945", "1000"); 

/* Shah Tuesday 9-10 */
INSERT INTO `schedules` VALUES (45, 900000007, 'UG', 2, "0900", "0915"); 
INSERT INTO `schedules` VALUES (46, 900000007, 'UG', 2, "0915", "0930"); 
INSERT INTO `schedules` VALUES (47, 900000007, 'UG', 2, "0930", "0945"); 
INSERT INTO `schedules` VALUES (48, 900000007, 'UG', 2, "0945", "1000"); 

/* Angha Tuesday 3-4 */
INSERT INTO `schedules` VALUES (49, 900000008, 'UG', 2, "1500", "1515"); 
INSERT INTO `schedules` VALUES (50, 900000008, 'UG', 2, "1515", "1530"); 
INSERT INTO `schedules` VALUES (51, 900000008, 'UG', 2, "1530", "1545"); 
INSERT INTO `schedules` VALUES (52, 900000008, 'UG', 2, "1545", "1600"); 

/* Angha Thursday 3-4 */
INSERT INTO `schedules` VALUES (53, 900000008, 'UG', 4, "1500", "1515"); 
INSERT INTO `schedules` VALUES (54, 900000008, 'UG', 4, "1515", "1530"); 
INSERT INTO `schedules` VALUES (55, 900000008, 'UG', 4, "1530", "1545"); 
INSERT INTO `schedules` VALUES (56, 900000008, 'UG', 4, "1545", "1600"); 

/* Kaz Friday 3-4 */
INSERT INTO `schedules` VALUES (57, 900000009, 'GR', 5, "1500", "1515"); 
INSERT INTO `schedules` VALUES (58, 900000009, 'GR', 5, "1515", "1530"); 
INSERT INTO `schedules` VALUES (59, 900000009, 'GR', 5, "1530", "1545"); 
INSERT INTO `schedules` VALUES (60, 900000009, 'GR', 5, "1545", "1600"); 

/* Dragutin Monday 10-11 */
INSERT INTO `schedules` VALUES (61, 900000010, 'UG', 1, "1000", "1015"); 
INSERT INTO `schedules` VALUES (62, 900000010, 'UG', 1, "1015", "1030"); 
INSERT INTO `schedules` VALUES (63, 900000010, 'UG', 1, "1030", "1045"); 
INSERT INTO `schedules` VALUES (64, 900000010, 'UG', 1, "1045", "1100"); 

/* Dragutin Wednesday 10-11 */
INSERT INTO `schedules` VALUES (65, 900000010, 'UG', 3, "1000", "1015"); 
INSERT INTO `schedules` VALUES (66, 900000010, 'UG', 3, "1015", "1030"); 
INSERT INTO `schedules` VALUES (67, 900000010, 'UG', 3, "1030", "1045"); 
INSERT INTO `schedules` VALUES (68, 900000010, 'UG', 3, "1045", "1100"); 

/* Rahul Thursday 6-7 */
INSERT INTO `schedules` VALUES (69, 900000011, 'UG', 4, "1800", "1815"); 
INSERT INTO `schedules` VALUES (70, 900000011, 'UG', 4, "1815", "1830"); 
INSERT INTO `schedules` VALUES (71, 900000011, 'UG', 4, "1830", "1845"); 
INSERT INTO `schedules` VALUES (72, 900000011, 'UG', 4, "1845", "1900"); 

/* Isabel Tuesday 5-6 */
INSERT INTO `schedules` VALUES (73, 900000012, 'UG', 2, "1700", "1715"); 
INSERT INTO `schedules` VALUES (74, 900000012, 'UG', 2, "1715", "1730"); 
INSERT INTO `schedules` VALUES (75, 900000012, 'UG', 2, "1730", "1745"); 
INSERT INTO `schedules` VALUES (76, 900000012, 'UG', 2, "1745", "1800"); 

/* Isabel Thursday 5-6 */
INSERT INTO `schedules` VALUES (77, 900000012, 'UG', 4, "1700", "1715"); 
INSERT INTO `schedules` VALUES (78, 900000012, 'UG', 4, "1715", "1730"); 
INSERT INTO `schedules` VALUES (79, 900000012, 'UG', 4, "1730", "1745"); 
INSERT INTO `schedules` VALUES (80, 900000012, 'UG', 4, "1745", "1800"); 

/* Jingyi Monday 1-2 */
INSERT INTO `schedules` VALUES (81, 900000013, 'TR', 1, "1300", "1315"); 
INSERT INTO `schedules` VALUES (82, 900000013, 'TR', 1, "1315", "1330"); 
INSERT INTO `schedules` VALUES (83, 900000013, 'TR', 1, "1330", "1345"); 
INSERT INTO `schedules` VALUES (84, 900000013, 'TR', 1, "1345", "1400"); 

/* Jingyi Wednesday 1-2 */
INSERT INTO `schedules` VALUES (85, 900000013, 'TR', 3, "1300", "1315"); 
INSERT INTO `schedules` VALUES (86, 900000013, 'TR', 3, "1315", "1330"); 
INSERT INTO `schedules` VALUES (87, 900000013, 'TR', 3, "1330", "1345"); 
INSERT INTO `schedules` VALUES (88, 900000013, 'TR', 3, "1345", "1400"); 

/* James Monday 4-5 */
INSERT INTO `schedules` VALUES (89, 900000014, 'UG', 1, "1600", "1615"); 
INSERT INTO `schedules` VALUES (90, 900000014, 'UG', 1, "1615", "1630"); 
INSERT INTO `schedules` VALUES (91, 900000014, 'UG', 1, "1630", "1645"); 
INSERT INTO `schedules` VALUES (92, 900000014, 'UG', 1, "1645", "1700"); 

/* James Wednesday 4-5 */
INSERT INTO `schedules` VALUES (93, 900000014, 'UG', 2, "0900", "0915"); 
INSERT INTO `schedules` VALUES (94, 900000014, 'UG', 2, "0915", "0930"); 
INSERT INTO `schedules` VALUES (95, 900000014, 'UG', 2, "0930", "0945"); 
INSERT INTO `schedules` VALUES (96, 900000014, 'UG', 2, "0945", "1000"); 


/* Hui Wednesday 2-3 */
INSERT INTO `schedules` VALUES (97, 900000002, 'GR', 3, "1400", "1415"); 
INSERT INTO `schedules` VALUES (98, 900000002, 'GR', 3, "1415", "1430"); 
INSERT INTO `schedules` VALUES (99, 900000002, 'GR', 3, "1430", "1445"); 
INSERT INTO `schedules` VALUES (100, 900000002, 'GR', 3, "1445", "1500"); 


/* Ilmi Thursday 11-12 */
INSERT INTO `schedules` VALUES (101, 900000015, 'TR', 4, "1100", "1115"); 
INSERT INTO `schedules` VALUES (102, 900000015, 'TR', 4, "1115", "1130"); 
INSERT INTO `schedules` VALUES (103, 900000015, 'TR', 4, "1130", "1145"); 
INSERT INTO `schedules` VALUES (104, 900000015, 'TR', 4, "1145", "1200"); 

/* Hao Friday 9-10 */
INSERT INTO `schedules` VALUES (105, 900000016, 'UG', 5, "0900", "0915"); 
INSERT INTO `schedules` VALUES (106, 900000016, 'UG', 5, "0915", "0930"); 
INSERT INTO `schedules` VALUES (107, 900000016, 'UG', 5, "0930", "0945"); 
INSERT INTO `schedules` VALUES (108, 900000016, 'UG', 5, "0945", "1000"); 