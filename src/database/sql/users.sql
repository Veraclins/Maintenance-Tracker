DROP DATABASE IF EXISTS maintenance;
CREATE DATABASE maintenance;

\c maintenance;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  email VARCHAR
);

INSERT INTO users (name, email)
  VALUES ('Agada', 'agada@gmail.com'), ('Clinton', 'agada'), ('Widget 3', 'ggddgd');