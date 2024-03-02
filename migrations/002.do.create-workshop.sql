CREATE TABLE IF NOT EXISTS workshops (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  speaker_id INT NOT NULL REFERENCES speakers(id)
);