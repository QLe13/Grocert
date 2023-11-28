CREATE TABLE Product (
    product_id INT PRIMARY KEY NOT NULL,
    category CHAR(200) NOT NULL,
    name CHAR(200) NOT NULL
);

CREATE TABLE Stores (
    store_id INT PRIMARY KEY NOT NULL,
    product_ids INT[] NOT NULL,
    zip_code INT NOT NULL
);

CREATE TABLE Has (
    relation_id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    store_id INT NOT NULL,
    units CHAR(20) NOT NULL,
    current_price FLOAT NOT NULL,
    amount VARCHAR(255) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES Product(product_id),
    FOREIGN KEY (store_id) REFERENCES Stores(store_id)
);

GRANT ALL ON ALL TABLES IN SCHEMA public to lmartin9;

\copy Product(product_id, name, category) FROM 'products.csv' WITH CSV HEADER
\copy Stores(store_id, product_ids, zip_code) FROM 'stores.csv' WITH CSV HEADER
\copy Has(product_id, store_id, current_price, amount, units) FROM 'has.csv' WITH CSV HEADER