# Requisitos

## Análisis de requisitos
Para el análisis de requisitos se partió desde la idea de hacer un sistema de gestión de datos de las prácticas externas para un departamento de la universidad. Identificar las necesidades básicas que dicho producto tenía que cumplir sirvió como base para escribir los requisitos de un sistema que pudiera gestionar datos para este y otros casos similares.

Es este análisis se hablará de el usuario haciendo referencia a cualquier persona que llegue a utilizar el sistema.

### Alcance
La definición de los requisitos, parte de la idea de que el software no planea reemplazar o competir con los sistemas de gestión de contenido que existen en el mercado (_Wordpress_, _Drupal_, etc), estos son proyectos de software maduros que cumplen con su objetivo de gran forma. De igual forma, tampoco se busca competir con generadores de sitios web estáticos (_Gatsby_, _Jekyll_, _Hugo_, etc), estos son similares en la implementación pero tienen un propósito más genérico.
El proyecto a definir, debe de encargarse simplemente de la gestión de los datos de un dominio específico.

### Objetivo
 El objetivo del sistema es proporcionar una plataforma que gestione los datos proporcionados a partir de una configuración que defina el dominio y la estructura de estos.
 Cuando hablamos de gestión de datos nos referimos a la habilidad de crear, editar, leer y eliminar datos. El dominio de estos datos se debe configurar en un esquema que defina, las entidades/modelos de datos, las propiedades de cada entidad, y las relaciones entre estas entidades.
 
Si tomamos como ejemplo el caso de gestión de prácticas externas universitarias. El sistema debe de proporcionar un método de registrar, editar, eliminar y consultar los datos de: tutores, grados, empresas, estudiantes. Estas serían las _entidades de datos_.
Sin embargo, también se debe proporcionar una manera de relacionar estas entidades. Por lo que se debe poder definir una _entidad-relación_ que llamaremos prácticas que permita crear, editar, eliminar y consultar datos que relacionan a las otras entidades.

### Consideraciones sobre el entorno y distribución
El sistema debe de funcionar en los principales exploradores web: Google Chrome, Mozilla Firefox, Safari y Edge. Por lo tanto la aplicación se debe desarrollar en Javascript, HTML y CSS. Además si los datos se alojan en un servidor, la aplicación tiene que poder conectarse al internet para descargarlos.
La aplicación esta orientada a usuarios con ordenador, pero al usar un diseño _responsive_, también soportará tablets.

### Requisitos funcionales
