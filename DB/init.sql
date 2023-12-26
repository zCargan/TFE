-- init.sql

-- Utilisation de la base de données "test"
\c test;

-- Crée la base de données
CREATE DATABASE test;


-- Création de la table utilisateurs
CREATE TABLE utilisateurs (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50),
    password VARCHAR(50),
    email VARCHAR(255), -- Changement de la longueur
    role VARCHAR(50)
);

-- Création de la table exercices
CREATE TABLE exercices (
    id SERIAL PRIMARY KEY,
    utilisateur_id INT,
    identifiant VARCHAR(50),
    pourcentage NUMERIC,
    temps TIMESTAMP,
    type VARCHAR(50)
);

-- Création de la table images
CREATE TABLE images (
    id SERIAL PRIMARY KEY,
    utilisateur_id INT,
    image_data BYTEA,
    type_mime VARCHAR(100),
    nom_d_origine VARCHAR(255),
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id)
);

-- Création de la table sons
CREATE TABLE sons (
    id SERIAL PRIMARY KEY,
    utilisateur_id INT,
    son_data BYTEA,
    type_mime VARCHAR(100),
    nom_d_origine VARCHAR(255),
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id)
);

-- Création de la table exerciceReference
CREATE TABLE exerciceReference (
    utilisateur_id INT,
    exercice_id VARCHAR(50),
    type VARCHAR(50),
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id)
);


-- Création de l'utilisateur
CREATE USER loganTFE WITH PASSWORD 'LoganTFE2023';

-- Attribution des privilèges à l'utilisateur sur la base de données 'test'
GRANT ALL PRIVILEGES ON DATABASE test TO loganTFE;