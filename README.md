# Build
mvn clean package && docker build -t it.ciacformazione/cloud_st .

# RUN

docker rm -f cloud_st || true && docker run -d -p 8080:8080 -p 4848:4848 --name cloud_st it.ciacformazione/cloud_st 