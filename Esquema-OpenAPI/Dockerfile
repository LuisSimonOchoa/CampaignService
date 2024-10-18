# Usa la imagen base oficial de Swagger UI
FROM swaggerapi/swagger-ui

# Copia tu archivo openapi.yaml a una carpeta diferente dentro del contenedor
COPY ./openapi.yaml /swagger/openapi.yaml
COPY ./swagger-config.yaml /usr/share/nginx/html/swagger-config.yaml

# Configura la variable de entorno para indicar a Swagger dónde encontrar el archivo
ENV SWAGGER_JSON /swagger/openapi.yaml