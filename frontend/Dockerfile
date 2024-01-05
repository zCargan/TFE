# Étape de construction
FROM node:14 as builder

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

# Étape d'exécution
FROM httpd:2.4

# Activez le module mod_rewrite
RUN sed -i '/<Directory "\/usr\/local\/apache2\/htdocs">/,/<\/Directory>/ s/AllowOverride None/AllowOverride All/' /usr/local/apache2/conf/httpd.conf

# Copiez le build de l'application dans le répertoire web d'Apache
COPY --from=builder /app/build/ /usr/local/apache2/htdocs/

# Ajoutez la configuration pour la gestion des routes côté client
COPY httpd.conf /usr/local/apache2/conf/httpd.conf

# Exposez le port sur lequel Apache écoute (par défaut, le port 80)
EXPOSE 80
