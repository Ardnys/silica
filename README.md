# Silica, a veterinary system to track vaccines

We built it for our database course.

# Commands of relevance

## Docker

Start the database container with

```bash
$ docker compose up --build
```

[Pre-seed the database](https://docs.docker.com/guides/pre-seeding/) with

```bash
$ cat seed.sql | docker exec -i silica-db-1 psql -h localhost -U postgres -f-
```

Also insert dummy data with the same command.

Attach to container with pqsl

```bash
$ docker compose exec db psql -U postgres -d vetdb
```

Then you can run SQL commands.

## Project

Run the server with

```bash
$ npm start
```
