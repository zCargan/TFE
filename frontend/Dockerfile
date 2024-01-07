
FROM node:14 as builder


WORKDIR /app


RUN npm install


RUN npm run build


FROM httpd:2.4


RUN sed -i '/<Directory "\/usr\/local\/apache2\/htdocs">/,/<\/Directory>/ s/AllowOverride None/AllowOverride All/' /usr/local/apache2/conf/httpd.conf


COPY --from=builder /app/build/ /usr/local/apache2/htdocs/


EXPOSE 80
