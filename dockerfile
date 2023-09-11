FROM postgres
ENV POSTGRES_DB billydb
ENV POSTGRES_USER admin
ENV POSTGRES_PASSWORD admin
COPY ./database/init.sql /docker-entrypoint-initdb.d/