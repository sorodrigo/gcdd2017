## Marco Teórico

### Patrones de Arquitectura Web
"Un patrón es una solución reusable que se puede aplicar a problemas relacionados con el diseño de software que ocurren frecuentemente."[1]

La arquitectura de una aplicación web ha ido evolucionando con el tiempo. Al principio las páginas web no necesitaban de un diseño de arquitectura en cliente, el código necesario—de lado del cliente—para conseguir lo que se deseaba era muy sencillo. Esto se debía a que la tecnología no permitía hacer cosas complejas.

Estas aplicaciones implementaban una arquitectura cliente-servidor, donde el servidor se encargaba del modelo, la lógica de negocio y las vistas. Y el cliente únicamente se encargaba de hacer peticiones y actualizar las vistas.

Con el tiempo, el lenguaje utilizado para desarrollar aplicaciones web (Javascript) fue evolucionando, permitiendo hacer cosas mucho más interesantes y a la vez complejas. Esto dió origen a las aplicaciones web del lado del cliente, también conocidas como aplicaciones front-end.

Al incrementar la complejidad y el tamaño de las aplicaciones front-end, nació la necesidad de diseñar la arquitectura de dichas aplicaciones.

La solución inmediata fue llevar la arquitectura utilizada tanto en aplicaciones de escritorio como en las aplicaciones web de servidor,  conocidas como aplicaciones back-end, al lado del cliente.