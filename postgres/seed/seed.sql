-- Seed  data with a fake user for testing

insert into users (name, email, entries, joined) values('a', 'a@a.com', 5, '2018-10-23');
insert into login (email, hash) values ('a@a.com', '$2a$10$6JSsU1oJVBHCAmueXnCxsudoQyju0yHvjk9wpNFgwqt7Kz.TC66ZK');
