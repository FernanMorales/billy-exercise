SET datestyle TO "SQL, DMY";

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL UNIQUE,
    start_date_time TIMESTAMP NOT NULL,
    end_date_time TIMESTAMP NOT NULL,
    location_name VARCHAR(100) NULL,
    address VARCHAR(100) NOT NULL,
    total_tickets_count INTEGER NOT NULL,
    max_tickets_per_user INTEGER NOT NULL,
    sale_start_date DATE NOT NULL,
    lineup VARCHAR(100) NULL,
    asset_url VARCHAR(100) NOT NULL
);

CREATE TABLE contracts (
    id SERIAL PRIMARY KEY,
    event_id INTEGER NOT NULL,
    collection_name VARCHAR(100) NOT NULL,
    smart_contract jsonb NOT NULL,
    CONSTRAINT fk_event_id
      FOREIGN KEY(event_id)
	    REFERENCES events(id)
        ON DELETE CASCADE
);

COPY events FROM '/postgresql/data_files/organizers-data.csv' DELIMITER ',' CSV HEADER;

\set content `cat /postgresql/data_files/smart-contracts-data.json`
CREATE TEMPORARY table t (j jsonb);
INSERT into t values(:'content');
create TEMPORARY table t2 as select jsonb_array_elements(j) from t;

INSERT INTO contracts (event_id, collection_name, smart_contract)
    select CAST(jsonb_array_elements->>'event_id' as integer), jsonb_array_elements->>'collection_name', CAST(jsonb_array_elements->'smart_contract' as jsonb) from t2

