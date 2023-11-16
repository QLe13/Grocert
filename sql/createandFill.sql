CREATE TABLE Has (
    relation_id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    store_id INT NOT NULL,
    units CHAR(20) NOT NULL,
    current_price FLOAT NOT NULL,
    amount TYPE VARCHAR(255) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES Product(product_id),
    FOREIGN KEY (store_id) REFERENCES Stores(store_id)
);

CREATE TABLE Product (
    product_id INT PRIMARY KEY NOT NULL,
    category CHAR(20) NOT NULL,
    name CHAR(20) NOT NULL
);

CREATE TABLE Stores (
    store_id INT PRIMARY KEY NOT NULL,
    product_ids INT[] NOT NULL,
    zip_code INT NOT NULL
);

\copy Has(product_id, store_id, current_price, amount, units) FROM '/users/mpopov/Desktop/has.csv' WITH CSV HEADER
\copy Stores(store_id, product_ids, zip_code) FROM '/users/mpopov/Desktop/has.csv' WITH CSV HEADER
\copy Product(product_id, category, name) FROM '/users/mpopov/Desktop/has.csv' WITH CSV HEADER
