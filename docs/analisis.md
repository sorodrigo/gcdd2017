# Arquitectura

La arquitectura del proyecto está dividida en las siguientes capas:
  - Base de Datos. Almacena los datos del sistema.
  - Servidor. Recibe peticiones REST, y actualiza la base de datos.
  - Configuración. Describe la estructura de la base de datos, y la forma de comunicarse entre servidor y cliente.
  - Aplicación de cliente. Recibe la estructura de la base de datos de la configuración y se comunica con el servidor para leer y modificar la base de datos. 

Por defecto la aplicación esta pensada para trabajar con una fuente de datos local desde un fichero en formato `.json`. Este fichero toma el rol de base de datos y un pequeño servidor web expone una API REST para que el cliente (_front-end_) pueda pedir y actualizar los datos mediante HTTP.

Esta separación en capas nos permite desacoplar el dónde y cómo se almacenan los datos de la aplicación que los gestiona. De esta forma, la aplicación puede gestionar datos que vengan de cualquier servidor que exponga una API REST. Para poder utilizar la aplicación con otro servidor, basta con cambiar el archivo de configuración. 

Para el desarrollo de la aplicación _front-end_ se ha utilizado la arquitectura Flux. Como se ha mencionado en capítulos anteriores, esta arquitectura permite estructurar la aplicación desde el punto de vista de la información, busca mantener un flujo de datos unidireccional y actualizaciones de datos uniformes entre todas las vistas.

Para este proyecto eso significa poder definir una estructura de la información que se encargue de leer y manipular entidades con las cuales construir vistas de manera dinámica. Mantener uniformes las actualizaciones a las entidades en todas las vistas, nos permite replicar el comportamiento de una aplicación que continuamente está enviando y recibiendo datos desde una base de datos, sin que este sea necesariamente el caso.