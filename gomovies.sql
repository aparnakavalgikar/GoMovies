create table booking (
bookingId int not null primary key auto_increment,
showId int not null,
movieName varchar(50) not null,
theaterName varchar(50) not null,
showTime varchar(50) not null,
price int not null,
seats blob
);
