### Modelo Vista Presentador (_MVP_)
El patrón de diseño _MVP_ es una variante del _MVC_, cuyo principal objetivo es mejorar la lógica de aplicación (presentacional). Al igual que su predecesor, _MVP_ también ejerce la separación de conceptos.

La lógica correspondiente a la vista en _MVC_ se delega al presentador y está desacoplada de la vista. Esto tiene ciertas ventajas como poder simular la vista en las pruebas unitarias.

El ejemplo más común de una aplicación _MVP_ es aquella que usa vistas pasivas también conocidas como vistas tontas, con nada o muy poca lógica. El presentador actúa como mediador entre la vista y el modelo, manteniendo a las otras partes aisladas.

En esta arquitectura, los presentadores reemplazan el rol del controlador. Reciben peticiones del usuario, ejecutan una acción y devuelven el resultado. También se encargan de actualizar el modelo. El modelo despacha eventos cuando sus datos se modifican, y es responsabilidad del presentador de subscribirse a estos. De esta forma la vista nunca se conecta con el modelo, solo expone _setters_ para que el presentador la actualice.

Ejemplo de vista (contacto)

Ejemplo de presentador (contacto)

#### _MVP_ en retrospectiva
El patrón _MVP_ se suele aplicar en aplicaciones que necesitan reutilizar la lógica presentacional en la medida de lo posible. Si una aplicacion tiene vistas muy complejas y muchas interacciones el _MVC_ no encaja muy bien. La razón principal es que para mantener este tipo de aplicaciones, se necesitarían muchos controladores y/o controladores muy complejos.

Al utilizar _MVP_ las vistas se convierten simplemente en interfaz, toda la lógica se encapsula en el presentador. Esto permite desarrollar separar la logica en partes más pequeñas y disminuye la complejidad de mantenimiento.

Como la vista solo refleja la interfaz, el desarrollo de la lógica presentacional se puede hacer al mismo tiempo que el diseño.