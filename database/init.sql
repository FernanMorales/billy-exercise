CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);

/* create a table events with the following fields 
    {
    "eventId": id (foreign key),
    "title": varchar,
    "startDatetime": datetime,
    "endDatetime": datetime,
    "address": varchar,
    "locationName": varchar,
    "totalTicketsCount": integer,
    "assetUrl": varchar,
    "lineUp": varchar,
*/

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL UNIQUE,
    startDatetime VARCHAR(100) NOT NULL,
    endDatetime VARCHAR(100) NOT NULL,
    address VARCHAR(100) NOT NULL,
    locationName VARCHAR(100) NOT NULL,
    totalTicketsCount INTEGER NOT NULL,
    assetUrl VARCHAR(100) NOT NULL,
    lineUp VARCHAR(100) NOT NULL
);

/* create a table contracts with the following fields
    "id": id primary key,
    "eventId": id (foreign key),
    "collectionName": varchar,
    "crowdsale": varchar,
    "collection": varchar,
    "multisig": varchar,
    "isPresale": boolean,
    "metadata": ,
    "pricePerToken": integer,
    "maxMintPerUser": integer,
    "saleSize": integer,
    "sale_currency": id foreign key
    "start_time": date,
    "end_time": date
*/

CREATE TABLE contracts (
    id SERIAL PRIMARY KEY,
    eventId INTEGER NOT NULL,
    collectionName VARCHAR(100) NOT NULL,
    crowdsale VARCHAR(100) NOT NULL,
    collection VARCHAR(100) NOT NULL,
    multisig VARCHAR(100) NOT NULL,
    isPresale BOOLEAN NOT NULL,
    metadata VARCHAR(100) NOT NULL,
    pricePerToken INTEGER NOT NULL,
    maxMintPerUser INTEGER NOT NULL,
    saleSize INTEGER NOT NULL,
    sale_currency VARCHAR(100) NOT NULL,
    start_time VARCHAR(100) NOT NULL,
    end_time VARCHAR(100) NOT NULL
);
