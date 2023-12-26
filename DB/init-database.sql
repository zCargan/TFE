-- Création de l'utilisateur loganAdmin
CREATE USER loganAdmin WITH PASSWORD 'LoganTFE2023';

-- Attribution des privilèges de superutilisateur
ALTER USER loganAdmin WITH SUPERUSER;

-- Changer vers la base de données "postgres"
\c postgres;

-- Supprimer la base de données si elle existe
DROP DATABASE IF EXISTS test;

-- Création de la base de données "test"
CREATE DATABASE test;