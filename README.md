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
   docker run -p 8080:8080 my-swagger-ui

## Despliegue del Backend Serverless

Para desplegar el Backend en un entorno serverless, deberá utilizar el [Serverless Framework](https://www.serverless.com/). Los archivos necesarios para la implementación se encuentran en la carpeta `BackendServerless`.

### Configuración del Proyecto

- **Librería MySQL**: Puede añadir la librería `mysql` en una capa para que las funciones Lambda puedan consumirla de manera eficiente. Esto ayudará a mantener el tamaño del paquete de despliegue de las funciones Lambda más pequeño, ya que la capa se puede reutilizar en varias funciones.

- **Archivo `serverless.yml`**: Este archivo se utiliza para definir y construir los endpoints utilizando API Gateway. En él, puede configurar los recursos, las funciones y los permisos necesarios para su aplicación.

- **Archivo `handler.js`**: Este archivo contiene la lógica de las funciones Lambda. Aquí es donde implementará la funcionalidad necesaria para manejar las solicitudes a los endpoints definidos en el archivo `serverless.yml`.

- **endpoints**: En esta carpeta, encontrará el archivo `endpoints.txt`, que contiene una lista de algunos endpoints desplegados que pueden ser útiles para realizar pruebas.

### Instrucciones para Desplegar

1. Asegúrese de tener [Node.js](https://nodejs.org/) y [npm](https://www.npmjs.com/) instalados en su máquina.
2. Instale el Serverless Framework globalmente utilizando el siguiente comando:

   ```bash
   npm install -g serverless
   serverless deploy
![image](https://github.com/user-attachments/assets/f3c41e19-12a7-4e1f-85d6-4a3d7daa8e64)

## Despliegue del Frontend

Los archivos del frontend se encuentran en la carpeta `FrontEndCampaing`, la cual fue desarrollada con [Angular](https://angular.io/). 

### Instrucciones para Desplegar

Para desplegar el frontend, siga estos pasos:

1. Navegue hasta la carpeta `FrontEndCampaing`:

   ```bash
   npm install
   ng serve
![image](https://github.com/user-attachments/assets/0b38e517-ec1a-45c7-bc59-7b59bb950725)

