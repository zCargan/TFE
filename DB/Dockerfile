# Utiliser l'image PostgreSQL officielle
FROM postgres

# Copier les scripts SQL d'initialisation dans le conteneur
COPY init-database.sql /docker-entrypoint-initdb.d/
COPY init-schema.sql /docker-entrypoint-initdb.d/

# Exposer le port par défaut
EXPOSE 5432