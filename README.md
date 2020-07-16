# apollo-server-https



### docker 
docker run -d -p 8080:80 -p 8443:443 \
-v //e/workspace/qpjoy/apollo-server-https/_docker/default.conf:/etc/nginx/conf.d/default.conf \
-v //e/workspace/qpjoy/apollo-server-https/key.pem:/root/localhost+1-key.pem \
-v //e/workspace/qpjoy/apollo-server-https/cert.pem:/root/localhost+1.pem \
nginx:alpine