CREATE DATABASE youtubeapidata;

-- \c youtubeapidata

CREATE TABLE ytdata(
    id SERIAL PRIMARY KEY,
    video_id VARCHAR(12) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    published_at TIMESTAMP NOT NULL,
    thumbnails_url VARCHAR(255) NOT NULL
);

-- /l => list all db in postgres
-- /c dbname => move inside db
-- /dt => show table in db
