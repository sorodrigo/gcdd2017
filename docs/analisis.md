 # Arquitectura

La arquitectura del proyecto está dividida en las siguientes capas:
  - Base de Datos. Almacena los datos del sistema.
  - Servidor. Recibe peticiones REST, y actualiza la base de datos.
  - Configuración. Describe la estructura de la base de datos, y la forma de comunicarse entre servidor y cliente.
  - Aplicación de cliente. Recibe la estructura de la base de datos de la configuración, y se comunica con el servidor para leer y modificar la base de datos. 

Por defecto la aplicación esta pensada para trabajar con una fuente de datos local desde un fichero en formato `.json`. Este fichero toma el rol de base de datos y un pequeño servidor web expone una API REST para que el cliente (_front-end_) pueda pedir y actualizar los datos mediante HTTP.

Esta separación en capas nos permite desacoplar el dónde y cómo se almacenan los datos de la aplicación que los gestiona. De esta forma, la aplicación puede gestionar datos que vengan de cualquier servidor que exponga una API REST. Para poder utilizar la aplicación con otro servidor, basta con cambiar el archivo de configuración. 

Para el desarrollo de la aplicación _front-end_ se ha utilizado una arquitectura de desarrollo orientado a componentes. Esta metodología basa el desarrollo de interfaces en construir pequeños pedazos de código que cumplan una tarea especifica. La modularidad no tiene nada de nuevo, sin embargo el desarrollo orientado a componentes implica un cambio en la forma de diseñar y desarrollar aplicaciones.

## Desarrollo orientado a componentes
Cuando hablamos de componentes nos referimos a una porción de código que se dedica exclusivamente a mostrar por pantalla un tipo de interfaz con una tarea específica. 
Las interfaces se desarrollan de "abajo a arriba", empezando con componentes y terminando a nivel de páginas y pantallas. Un componente puede tener datos de entrada y estado local, y solamente tiene una salida, la interfaz. A su vez un componente puede estar conformado por otros componentes.

Los principales beneficios son:
  1. **Reutilización.** El tener la interfaz de la aplicación dividida en pequeños pedazos de código, facilita la reutilización y aumenta la velocidad de desarrollo.
  2. **Desacomplamiento.** El desarrollo de un componente no depende del estado de la aplicación. Esto simplifica el problema a resolver y permite no depender de la aplicación actual al desarrollar futuras interfaces.
  3.  **Desarrollo en Paralelo.** Trabajar en un componente varias personas a la vez, permite compartir tareas de una forma que no es posible cuando se trabaja por pantallas.


## Esquemas de configuración

### Esquema de entidades de datos
El punto de partida del proyecto son los datos. Estos datos deben de estar estructurados en entidades y almacenados en una base de datos.

### Esquema entidad-aplicación
Se debe especificar como se debe tratar cada entidad dentro de la aplicación.

### Esquema de consulta de datos
Se debe definir como se representan los datos de cada entidad dentro de la tabla de consultas. Además se debe definir como representar una relación entre entidades a la hora de consultar los datos.

### Esquema de edición de datos
Se debe definir el tipo de datos de cada entidad y como editarlos en el caso de que estos no se editen de manera trivial.