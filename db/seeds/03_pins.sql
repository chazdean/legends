-- seeds for pins table

INSERT INTO pins
  (creator_id, map_id, title, description, img_url, lat, lng, date_created)
VALUES
  (1, 1, 'McDonalds', 'Quick Fast Food!', 'https://i.imgur.com/iITW6Th.jpeg', 43.64896275348989, -79.39673885970697, '2021-02-12T08:00:00.000Z'),
  (1, 1, 'Gusto 101', 'Best Italian food', 'https://i.imgur.com/md7GytL.jpeg', 43.64553910836702, -79.40011196876507, '2021-02-13T07:00:00.000Z'),
  (1, 1, 'PAI', 'Oh so you like Thai food!?', 'https://i.imgur.com/6r0DWAv.jpeg', 43.64826511711568, -79.388807980814, '2021-02-13T07:00:00.000Z'),
  (2, 1, 'Makers Pizza', 'Best pizza in Toronto!', 'https://i.imgur.com/VUEGlFp.jpeg', 43.65123741729517, -79.39810118582328, '2021-03-15T07:00:00.000Z'),

  (2, 2, 'Rideau Canal', 'Walking, skating and people watching', 'https://i.imgur.com/5Yoh50f.jpeg', 45.39650875894239, -75.68838142193081, '2021-03-17T09:00:00.000Z'),
  (2, 2, 'Museum of Nature', 'Fossils, insects and creepy crawling things', 'https://i.imgur.com/kLCiOLX.jpeg', 45.41369008265107, -75.68821180729212, '2021-03-18T09:00:00.000Z'),
  (4, 2, 'Parliament Hill', 'Canadian legislature, with artworks, lush grounds & tours', 'https://i.imgur.com/kg3DbAt.jpeg', 45.42442876033488, -75.70123830513533, '2021-03-25T09:00:00.000Z'),
  (5, 2, 'Confederation Park', 'Relax by the fountain', 'https://i.imgur.com/wQlVlXS.jpeg', 45.42250907147711, -75.69233342677546, '2021-03-28T09:00:00.000Z'),

  (3, 3, 'Centre Eaton', 'Excellent mall, lots of stores', 'https://i.imgur.com/PRrNSwp.jpeg', 45.502798911112016, -73.57135772648414, '2021-08-19T09:00:00.000Z'),
  (3, 3, 'Bonsecours Market', 'Apparel & accessory boutiques', 'https://i.imgur.com/xTV1LrW.jpeg', 45.50940274567097, -73.55151857635282, '2021-08-20T09:00:00.000Z'),

  (4, 4, 'Peace Bridge', 'Walk along the Bow river', 'https://i.imgur.com/ZOqpcgX.jpeg', 51.05412775266186, -114.07898055975402, '2021-05-26T09:00:00.000Z'),
  (4, 4, 'Canada Olympic Park', 'A great place to ski', 'https://i.imgur.com/oGZk0XT.jpeg', 51.08514935323801, -114.22160733793031, '2021-05-26T09:00:00.000Z'),
  (3, 4, 'Nose Hill Park', 'Excellent hiking trails', 'https://i.imgur.com/zYz1TMy.jpeg', 51.109446747102425, -114.10891442537984, '2021-07-19T09:00:00.000Z'),

  (1, 5, 'Breakwater Lightouse', 'Walk out to the edge and see for miles', 'https://lh5.googleusercontent.com/p/AF1QipPvQ9JfDSSZOilng5lKf_RVXLkX59Jd-IZF8W7z=w408-h544-k-no', 48.41388857426095, -123.39388790128028, '2021-07-24T09:00:00.000Z'),
  (7, 5, 'Government Street', 'Lots restaurants and historic buildings', 'https://www.tourismvictoria.com/sites/default/files/lojo-shoppers1.jpg', 48.42553881069869, -123.36772378163407, '2021-07-30T09:00:00.000Z'),

  (5, 6, 'Spirit Halloween', 'This place has the best masks', 'https://static.onecms.io/wp-content/uploads/sites/6/2012/12/scream-12.jpg', 43.64560453508988, -79.39465149167678, '2021-10-21T09:00:00.000Z'),
  (8, 6, 'Crazy Costumes', 'Great costume ideas, and good prices', 'https://i.cbc.ca/1.5325270.1571348799!/fileImage/httpImage/pop-culture-halloween-costumes-2019.jpg', 43.65803631941631, -79.38177259194548, '2021-10-23T09:00:00.000Z'),
  (5, 6, 'Haunted Walk', 'Spooky walk along the water front', 'https://www.tourismvictoria.com/sites/default/files/j_gibzzphoto-instagram-1236-ig-17984357806241363_1.jpg', 43.650529380257076, -79.36047658118086, '2021-10-22T09:00:00.000Z');
