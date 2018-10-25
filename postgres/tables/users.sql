BEGIN TRANSACTION;

CREATE TABLE users (
	id serial PRIMARY KEY,
	name varchar(100),
	email text UNIQUE NOT NULL,
	entries BIGINT DEFAULT 0,
	joined TIMESTAMP NOT NULL,
	pet text,
	age varchar(100)
);

COMMIT;
