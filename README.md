## Base de Datos

La base de datos está desplegada en [AWS RDS](https://aws.amazon.com/rds/), utilizando MySQL como sistema de gestión de bases de datos.

Para cargar las tablas y datos de prueba, se utilizó [MySQL Workbench](https://www.mysql.com/products/workbench/). 

Puedes encontrar las definiciones de las tablas y algunos datos de prueba en la carpeta `modelado`. Asegúrate de importar estos archivos en tu instancia de RDS para configurar correctamente la base de datos.

## Documentación de la API

Los diseños de los endpoints se realizaron con [OpenAPI](https://www.openapis.org/) y la documentación de las rutas se puede visualizar ejecutando un contenedor con Swagger. Para ello, utiliza el `Dockerfile` que se encuentra en la carpeta `Esquema-OpenAPI`.

### Instrucciones para Ejecutar Swagger

1. Abre tu terminal y navega hasta la carpeta `Esquema-OpenAPI`.
2. Construye la imagen de Docker utilizando el siguiente comando:

   ```bash
   docker build -t my-swagger-ui .
   ```bash
   docker run -p 8080:8080 my-swagger-ui
