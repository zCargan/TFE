# Utiliser l'image PostgreSQL officielle
FROM postgres

# Copier le script SQL d'initialisation dans le conteneur
COPY init.sql /docker-entrypoint-initdb.d/

# Exposer le port par défaut
EXPOSE 5432