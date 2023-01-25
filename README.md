# QLeaf-Assignment

This repository contains the Backend Assignment of Youtube API, Database Integration, and Dockerization.

## Additional Optimization Steps:

1. We can use publishedBefore alongwith publishedAfter to get only unique data in our database.
2. Use multithreading/worker-threads, OR keep writing operation (+ YoutubeAPI) on one microservice and the DB reads on another.
3. Create indexing document/column while using ts_vector and ts_query before inserting the video data in Postgres Database.
4. Instead of using OFFSET we can find a smarter approach (use estimates such as WHERE clause, etc.) to avoid scanning all rows in OFFSET.
5. Create Layered DockerFile so that the file size of Docker Image is lower.
6. For DX: Use Docker Volumes so the Developer's Codebase is in sync with the Container Codebase.
