# Utilisez une image de base adaptée à Node.js
FROM node:14

# Définissez le répertoire de travail
WORKDIR /app

# Copiez les fichiers nécessaires dans le conteneur
COPY . .

# Installez nodemon de manière globale (vous pouvez ajuster la version selon vos besoins)
RUN npm install -g nodemon

# Installez les dépendances, y compris mongoose
RUN npm install

# Commande pour démarrer votre application avec nodemon
CMD ["nodemon", "server.js"]