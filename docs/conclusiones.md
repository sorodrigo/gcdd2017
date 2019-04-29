# Conclusiones
A lo largo de este proyecto hemos hablado de como han cambiado con el tiempo las aplicaciones en cliente. Explicamos la evolución de los patrones de arquitectura web, desde el inicio cuando se usaban lo mismos patrones que en el lado del servidor (MVC), pasando por sus distintas evoluciones (MVP y MVVM), hasta llegar al patrón de arquitectura web que se usa hoy en día (Flux).

Se tomó como caso práctico la gestión de las prácticas universitarias dentro de un departamento de la universidad. Desde este caso práctico se plantearon los objetivos, los requisitos a cumplir y la forma de abordar el problema. Se eligió trabajar con una metodología de software orientado a componentes, aprovechando el uso de programación reactiva para mantener la aplicación sincronizada con los cambios de datos.

Al final de este proyecto, hemos alcanzado los objetivos planteados al inicio. Sin embargo, para poder usarse en el día a día dentro de un departamento universitario existen detalles que hay que pulir y funciones que faltan por añadir. Este proyecto marca el camino a seguir para obtener un sistema de gestión de datos que sea útil en más de un dominio, pero como cada dominio tiene requisitos muy específicos a sus necesidades aún queda mucho trabajo por hacer.

## Mejoras para el futuro
Dentro de las cosas a mejorar, se han identificado las siguientes funcionalidades:
- **GUI de configuración.** Hacer una interfaz gráfica para poder crear los esquemas de configuración sin la necesidad de conocer el formato `.json`.
- **Versión móvil.** Mejorar los estilos de la aplicación web para soportar no solo computadoras de escritorio y tablets, sino también teléfonos móviles.
- **Soporte a JWT.** Añadir soporte a más métodos de autenticación web, entre ellos soportar JWT (JSON Web Token).
- **Soporte a otros tipos de datos (archivos, imágenes).** Dar soporte de primer nivel a archivos. Añadir la posibilidad de subir archivos de datos o imágenes.
- **Mejorar estilos markdown.** Mejorar los estilos de las páginas markdown en la aplicación web.
- **Soporte de páginas markdown genéricas.** Posibilidad de añadir páginas de formato markdown de manera genérica. No limitar el uso de las páginas markdown a la página de inicio.