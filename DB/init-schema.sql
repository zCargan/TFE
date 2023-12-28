-- init-schema.sql

CREATE TABLE utilisateurs (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50),
    password TEXT,
    email VARCHAR(255),
    role VARCHAR(50)
);

CREATE TABLE exercices (
    id SERIAL PRIMARY KEY,
    utilisateur_id INT,
    identifiant VARCHAR(50),
    pourcentage NUMERIC,
    temps TIMESTAMP,
    type VARCHAR(50)
);

CREATE TABLE images (
    id SERIAL PRIMARY KEY,
    utilisateur_id INT,
    image_data BYTEA,
    type_mime VARCHAR(100),
    nom_d_origine VARCHAR(255),
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id)
);

CREATE TABLE sons (
    id SERIAL PRIMARY KEY,
    utilisateur_id INT,
    son_data BYTEA,
    type_mime VARCHAR(100),
    nom_d_origine VARCHAR(255),
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id)
);

CREATE TABLE exerciceReference (
    utilisateur_id INT,
    exercice_id VARCHAR(50),
    type VARCHAR(50),
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id)
);
