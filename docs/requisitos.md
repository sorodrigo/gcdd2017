# Requisitos

## Análisis de requisitos
Para el análisis de requisitos se partió desde la idea de hacer un sistema de gestión de datos de las prácticas externas para un departamento de la universidad. Identificar las necesidades básicas que dicho producto tenía que cumplir sirvió como base para escribir los requisitos de un sistema que pudiera gestionar datos para este y otros casos similares.

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

| Número  |Definición                                                                                                                                                                     |
| ------- |-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| RF.01   |El sistema deberá mostrar una página de inicio, generada a partir de un archivo de configuración.                                                                              |
| RF.02   |El sistema debe tener la opción de proteger el contenido mediante un formulario de inicio de sesión.                                                                           |
| RF.03   |En caso de hacer inicio de sesión, el sistema debe de mostrar una página con la información del usuario.                                                                       |
| RF.04   |El sistema deberá mostrar un menú para acceder a cada modelo de datos.                                                                                                         |
| RF.05   |Cada entidad de datos debe una página de consulta de datos.                                                                                                                    |
| RF.05.1 |La página de consulta de datos debe incluir una tabla donde se muestren los datos.                                                                                             |
| RF.05.2 |La tabla de consulta de cada entidad debe de soportar búsqueda de texto y ordenación de datos.                                                                                 |
| RF.06   |Cada entidad de datos debe tener una página de creación de datos.                                                                                                              |
| RF.06.1 |La página de creación de datos debe de mostrar un formulario con campos que correspondan a cada una de las propiedades de la entidad.                                          |
| RF.06.2 |Los campos del formulario deberán corresponder al tipo de datos de cada propiedad.                                                                                             |
| RF.06.3 |El usuario debe de ser capaz de definir mediante un esquema de configuración el tipo de datos de cada campo del formulario.                                                    |
| RF.06.4 |Los campos del formulario deben de poder ser de tipo: texto, numérico, correo, contraseña, selección multiple (checkbox), selección única (select, radio) y selección de fecha.|
| RF.06.5 |Se debe poder representar en los campos del formulario las relaciones de propiedades entre distintas entidades.                                                                |