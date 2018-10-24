-- Seed  data with a fake user for testing

insert into users (name, email, entries, joined) values(
'a', 'a@example.com', 5, '2018-10-23');
insert into login (email, hash) values ('a@a.com', '
$2y$10$uUvQjhxuiwWKiHzQwEM2l.LWNDmdBHJZwUvKZQUg0S4qI8iTkaQXa');