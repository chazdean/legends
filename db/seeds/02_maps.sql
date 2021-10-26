-- seeds for maps table

INSERT INTO maps
  (creator_id, title, description, city, province, country, date_created)
VALUES
  (1, 'Best Food Spots', 'Top places to eat in the big city', 'Toronto', 'ON', 'Canada', '2021-02-12T08:00:00.000Z'),
  (1, 'Worst Food Spots', 'Worst places to eat in the big city', 'Toronto', 'ON', 'Canada', '2021-02-12T08:00:00.000Z'),
  (1, 'Top Halloween Activities 🎃', 'Top SPOOKS!', 'Toronto', 'ON', 'Canada', '2021-02-12T08:00:00.000Z'),
  (2, 'A Day in the Capital', 'My favorite sites to see', 'Ottawa', 'ON' , 'Canada', '2021-03-17T08:00:00.000Z'),
  (3, 'Who Loves Shopping!', 'Best shopping spots in town', 'Montreal', 'QC', 'Canada', '2021-08-19T08:00:00.000Z'),
  (4, 'Get Outside', 'Outdoor activiy spots', 'Calgary', 'AB', 'Canada', '2021-05-25T08:00:00.000Z');
