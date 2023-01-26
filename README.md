# QLeaf-Assignment

This repository contains the Backend Assignment of Youtube API, Database Integration, and Dockerization.


DEMO : https://drive.google.com/file/d/1mipuQNTymhJx-aSOMl1_wGJubuZdmgWa/view?usp=sharing

### P.S: The project works successfully apart from Dockerizing just the Database, because database is on localhost and its docker was not created in this submission. So the `docker-compose` connects the frontend and backend successfully, but does not perform database queries.

## Procedure to Recreate the project (WITHOUT DOCKER):
1. Copy the repository and open in an IDE.
```
git clone https://github.com/abhiram11/QLeaf-Assignment.git
```

2. Open one command prompt in the base directory of the project and another in the `/client2`, and install the node_modules.
```
# in base
npm i

# in /client2
npm i
```

3. The steps to create the PostgreSQL database and table are written in `src/database.sql`, you can install Postgres locally and create the database locally by following this step.

4. Create a `.env` file in the base directory and add your `YOUTUBE_API_KEY`
```
YOUTUBE_API_KEY=xxxYourAPIKeyxxx
```

5. Uncomment the following lines (around line 128) to call YoutubeAPI and store the video data My YoutubeAPI Key was exhausted and I couldn't write code to connect multiple API Keys by the submission time, so I commented it.
```
// callYoutubeApi();
// setInterval(callYoutubeApi, 60000); //calling every 60 seconds
```

6. Run the following commands
```
# in base
node src

# in client2
npm start

```

7. Open `localhost:3000` in your browser, the routes are explained below:
- `/vids` : shows the latest 100 video data added to the database
- `/vids/pageNo` : pagination done on that video date with a page size of 20 results
- `/search/yourQuery` : will return results based on yourQuery, it is optimized to query on multiple words individually.

## Procedure to Recreate the project (WITH DOCKER):
1. Copy the repository and open in an IDE.
```
git clone https://github.com/abhiram11/QLeaf-Assignment.git
```

2. Run `docker-compose up`

### P.s. This will connect frontend and backend but the database queries will not work unfortunately.

## Additional Optimization Steps:

1. We can use `publishedBefore` alongwith `publishedAfter` to get only unique data in our database. (Already added in the submission✅)
2. Use multithreading/worker-threads, OR keep writing operation (+ YoutubeAPI) on one microservice and the DB reads on another.
3. Create indexing document/column while using `ts_vector` and `ts_query` before inserting the video data in Postgres Database. If required, we can perform ranking/weighted results based on column priority as well.
4. Instead of using OFFSET we can find a smarter approach (use estimates such as WHERE clause, etc.) to avoid scanning all rows in OFFSET.
5. Create Layered DockerFile so that the file size of Docker Image is lower.
6. For DX: Use Docker Volumes so the Developer's Codebase is in sync with the Container Codebase.
7. We could also use ORMs, Sequalize and Moment.js (too heavy) for faster Development.
