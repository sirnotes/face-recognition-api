# Face Recognition API

The Node.js server component for the Face Recognition App.

To run:
1. Clone the repo
2. Set **DATABASE_URL** environement variable to your `postgres://` connection string.
3. Set the Environment variable *CLARIFAI_KEY* to your API Key from [Clarifai](https://clarifai.com)
3. run `npm install`
4. run `npm start`

Use the [Face Recognition app](https://github.com/kennithnichol/face-recognition) to interact with the API, or build your own app.

## Endpoints
GET /
  List users
POST /signin < (email, password)
  Validate a user
POST /register < (email, name, password)
  register a new user
GET /profile/:id < ( user.id)
  Get the profile of a specified user
PUT /image < (user.id)
  Increment the `user.entries` value for the indicated user.

**By default, the server listens on port 3000 unless a `process.env.PORT` is found**

## DB Requirments
You will need a PostgreSQL server (or change it if you wish).

Database tables required are:
```sql
CREATE TABLE users (
	id serial PRIMARY KEY,
	name varchar(100),
	email text UNIQUE NOT NULL,
	entries bigint DEFAULT 0,
	joined timestamp NOT NULL
);

CREATE TABLE login (
	id serial PRIMARY KEY,
	email text UNIQUE NOT NULL,
	hash varchar(100) NOT NULL
);
```
