# Étape de construction
FROM node:14 as builder

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

# Étape d'exécution
FROM httpd:2.4

# Copiez le build de l'application dans le répertoire web d'Apache
COPY --from=builder /app/build/ /usr/local/apache2/htdocs/

# Exposez le port sur lequel Apache écoute (par défaut, le port 80)
EXPOSE 80
