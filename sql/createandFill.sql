CREATE TABLE Images (
    image_id SERIAL PRIMARY KEY,
    image BYTEA NOT NULL,
    image_path VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE Product (
    product_id INT PRIMARY KEY NOT NULL,
    category CHAR(200) NOT NULL,
    amount VARCHAR(255) NOT NULL,
    units CHAR(20) NOT NULL,
    dollar INT NOT NULL,
    cents INT NOT NULL,
    name CHAR(200) NOT NULL,
    image_id INT,
    FOREIGN KEY (image_id) REFERENCES Images(image_id)
);

CREATE TABLE Stores (
    store_id INT PRIMARY KEY NOT NULL,
    zip_code INT NOT NULL,
    store_name VARCHAR(255) NOT NULL
);

CREATE TABLE Has (
    relation_id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    store_id INT NOT NULL,
    units CHAR(20) NOT NULL,
    dollar INT NOT NULL,
    cents INT NOT NULL,
    amount VARCHAR(255) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES Product(product_id),
    FOREIGN KEY (store_id) REFERENCES Stores(store_id)
);

GRANT ALL ON ALL TABLES IN SCHEMA public to lmartin9;
GRANT ALL ON ALL TABLES IN SCHEMA public to grocery;

\copy Product(product_id, name, category, image_id, amount, units, dollar, cents) FROM 'products.csv' WITH CSV HEADER;
\copy Stores(store_id, zip_code, store_name) FROM 'final_stores.csv' WITH CSV HEADER;
\copy Has(product_id, store_id, dollar, cents, amount, units) FROM 'new_has.csv' WITH CSV HEADER;