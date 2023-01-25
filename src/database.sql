CREATE DATABASE youtubeapidata;

CREATE TABLE ytdata(
    video_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    published_at TIMESTAMP,
    thumbnails_url VARCHAR(255)
);

-- /l => list all db in postgres
-- /c dbname => move inside db
-- /dt => show table in db
