drop table users;

create table users(
    id serial not null primary key,
    username text not null unique,
    greet_number int not null
)