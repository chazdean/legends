-- seeds for maps table

INSERT INTO maps
  (creator_id, title, description, map_img_url, city, province, country, date_created)
VALUES
  (1, 'Best Food Spots', 'Top places to eat in the big city', 'https://i.imgur.com/EEfSMS0.jpeg', 'Toronto', 'ON', 'Canada', '2021-02-12T08:00:00.000Z'),
  (1, 'Worst Food Spots', 'Worst places to eat in the big city', 'https://i.imgur.com/EEfSMS0.jpeg', 'Toronto', 'ON', 'Canada', '2021-02-12T08:00:00.000Z'),
  (1, 'Top Halloween Activities 🎃', 'Top SPOOKS!', 'https://i.imgur.com/EEfSMS0.jpeg', 'Toronto', 'ON', 'Canada', '2021-02-12T08:00:00.000Z'),
  (2, 'A Day in the Capital', 'My favorite sites to see', 'https://i.imgur.com/kg3DbAt.jpeg', 'Ottawa', 'ON' , 'Canada', '2021-03-17T08:00:00.000Z'),
  (3, 'Who Loves Shopping!', 'Best shopping spots in town', 'https://i.imgur.com/v4J8W6v.jpeg', 'Montreal', 'QC', 'Canada', '2021-08-19T08:00:00.000Z'),
  (4, 'Get Outside', 'Outdoor activiy spots', 'https://i.imgur.com/u7lLSnW.jpeg', 'Calgary', 'AB', 'Canada', '2021-05-25T08:00:00.000Z');
