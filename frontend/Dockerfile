# Utilisez une image de base adaptée à Node.js
FROM node:14 as builder

# Définissez le répertoire de travail
WORKDIR /app

# Copiez les fichiers nécessaires dans le conteneur
COPY . .

# Installez les dépendances
RUN npm install

# Construisez l'application React
RUN npm run build

# Utilisez une image légère d'Apache pour servir l'application construite
FROM httpd:2.4

# Copiez le build de l'application dans le répertoire web d'Apache
COPY --from=builder /app/build/ /usr/local/apache2/htdocs/

# Exposez le port sur lequel Apache écoute (par défaut, le port 80)
EXPOSE 80