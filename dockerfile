FROM postgres
ENV POSTGRES_DB billydb
ENV POSTGRES_USER admin
ENV POSTGRES_PASSWORD admin
ENV TZ=CET-1CEST
COPY ./database/init.sql /docker-entrypoint-initdb.d/
RUN mkdir postgresql
RUN cd postgresql
WORKDIR /postgresql
RUN mkdir data_files
ADD data/organizers-data.csv /postgresql/data_files/
ADD data/smart-contracts-data.json /postgresql/data_files/
