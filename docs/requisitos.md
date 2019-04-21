# Requisitos

## Análisis de requisitos
Para el análisis de requisitos se partió de la idea de hacer un sistema de gestión de datos de las prácticas externas para un departamento de la universidad. Identificar las necesidades básicas que dicho producto tenía que cumplir sirvió como base para escribir los requisitos de un sistema que pudiera gestionar datos para este y otros casos similares.

En este análisis se hablará de el usuario haciendo referencia a cualquier persona que llegue a utilizar el sistema.

### Alcance
La definición de los requisitos, parte de la idea de que el software no planea reemplazar o competir con los sistemas de gestión de contenido que existen en el mercado (_Wordpress_, _Drupal_, etc), estos son proyectos de software maduros que cumplen con su objetivo de gran forma. De igual forma, tampoco se busca competir con generadores de sitios web estáticos (_Gatsby_, _Jekyll_, _Hugo_, etc), estos son similares en la implementación pero tienen un propósito más genérico.
El proyecto a definir, debe de encargarse simplemente de la gestión de los datos de un dominio específico.

### Objetivo
 El objetivo del sistema es proporcionar una plataforma que gestione datos. Estos datos serán proporcionados a partir de una configuración que defina el dominio y la estructura de estos.
 Cuando hablamos de gestión de datos nos referimos a la habilidad de crear, editar, leer y eliminar datos. El dominio de estos datos se debe configurar en un esquema que defina, las entidades/modelos de datos, las propiedades de cada entidad, y las relaciones entre estas entidades.
 
Si tomamos como ejemplo el caso de gestión de prácticas externas universitarias. El sistema debe de proporcionar un método de registrar, editar, eliminar y consultar los datos de: tutores, grados, empresas, estudiantes. Estas serían las _entidades de datos_.
Sin embargo, también se debe proporcionar una manera de relacionar estas entidades. Por lo que se debe poder definir una _entidad-relación_ que en este caso llamaremos prácticas, que permita crear, editar, eliminar y consultar datos que relacionan a las otras entidades.

### Consideraciones sobre el entorno y distribución
El sistema debe de funcionar en los principales exploradores web: Google Chrome, Mozilla Firefox, Safari y Edge. Por lo tanto la aplicación se debe desarrollar en Javascript, HTML y CSS. Además si los datos se alojan en un servidor, la aplicación tiene que poder conectarse al internet para descargarlos.
La aplicación esta orientada a usuarios con ordenador, pero al usar un diseño _responsive_, también soportará tablets.

### Requisitos funcionales

| Número   | Definición                                                                                                                                                                                                                    |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| RF.01    | El sistema deberá mostrar una página de inicio, generada a partir de un archivo de configuración.                                                                                                                             |
| RF.02    | El sistema debe tener la opción de proteger el contenido mediante un formulario de inicio de sesión.                                                                                                                          |
| RF.02.1  | Deberá existir la posibilidad de proteger el contenido a nivel de entidad, permitiendo el acceso a algunas entidades y protegiendo otras.                                                                                     |
| RF.03    | En caso de hacer inicio de sesión, el sistema debe de mostrar una página con la información del usuario.                                                                                                                      |
| RF.04    | El sistema deberá mostrar un menú para acceder a cada modelo de datos.                                                                                                                                                        |
| RF.05    | Cada entidad de datos debe tener una página de consulta de datos.                                                                                                                                                             |
| RF.05.1  | La página de consulta de datos debe incluir una tabla donde se muestren los datos.                                                                                                                                            |
| RF.05.2  | La tabla de consulta de cada entidad debe de soportar búsqueda de texto y ordenación de datos.                                                                                                                                |
| RF.06    | El usuario debe de poder definir que propiedades se muestran en la tabla de consulta mediante un archivo de configuración.                                                                                                    |
| RF.07    | La tabla de consulta debe permitir la interacción con los datos de cada fila.                                                                                                                                                 |
| RF.07.01 | Las acciones permitidas con los datos de cada fila son: ver, editar y eliminar.                                                                                                                                               |
| RF.07.02 | El usuario debe poder escoger que acciones son permitidas en cada entidad de datos.                                                                                                                                           |
| RF.07.03 | El usuario podrá definir una propiedad de usuario como rol.                                                                                                                                                                   |
| RF.07.04 | En caso de definir un rol, se podrá limitar las acciones permitidas a cada usuario dependiendo de su rol.                                                                                                                     |
| RF.08    | Si una entidad soporta la acción de ver, cada fila de la tabla de consulta debe tener una página de detalle donde se muestren todos los datos de esta fila, incluyendo aquellos que no aparecen como columna de la tabla.     |
| RF.09    | Además de poder interactuar con las filas de la tabla, el usuario podrá crear nuevas entradas de datos.                                                                                                                       |
| RF.09.1  | El usuario podrá definir mediante el archivo de configuración si una pagina de entidad soporta la creación de datos. Como en el resto de las acciones, se podrá limitar la creación de datos a usuarios con un rol específico.|
| RF.09.2  | El rol de usuario se definirá de igual manera que en las acciones de la tabla (ver, editar, eliminar).                                                                                                                        |
| RF.09.3  | Si una entidad soporta la acción de crear, se debe mostrar una página de creación de datos que incluya un formulario con campos que correspondan a cada una de las propiedades de la entidad.                                 |
| RF.09.4  | Los campos del formulario deberán corresponder al tipo de datos de cada propiedad.                                                                                                                                            |
| RF.09.5  | El usuario debe de ser capaz de definir mediante un esquema de configuración el tipo de datos de cada campo del formulario.                                                                                                   |
| RF.09.6  | Los campos del formulario deben de poder ser de tipo: texto, numérico, correo, contraseña, selección multiple (checkbox), selección única (select, radio) y selección de fecha.                                               |
| RF.09.7  | Se debe poder representar en los campos del formulario las relaciones de propiedades entre distintas entidades.                                                                                                               |
| RF.10    | Si una entidad soporta la acción de editar, cada fila de la tabla debe tener una página de edición. Esta página mostrará el mismo formulario que la página de creación con los campos rellenados con los valores de la fila.  |
| RF.11    | Si una entidad soporta la acción de eliminar, cada fila de la tabla debe mostrar un botón de eliminar, esté debe mostrar una ventana de confirmación antes de llevar a cabo la eliminación.                                   |