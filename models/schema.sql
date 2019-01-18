create database user_db;
use user_db;
create table hiker(
user varchar(16) not null primary key,
password varchar(16) not null,
firstName varchar(16),
lastName varchar(16),
displayName varchar(16),
information varchar(200),
image blob
);

insert into hiker(user, password)
values ("Bob", "Password");
select * from hiker
