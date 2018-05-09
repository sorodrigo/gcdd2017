# Patrón de diseño

Como principal patrón de diseño se utiliza la arquitectura Flux. Como se ha mencionado en capítulos anteriores, esta arquitectura permite estructurar la aplicación desde el punto de vista de la información, busca mantener un flujo de datos unidireccional y actualizaciones de datos uniformes entre todas las vistas.

Para este proyecto eso significa poder definir una estructura de la información que se encargue de leer y manipular entidades con las cuales construir vistas de manera dinámica. Mantener uniformes las actualizaciones a las entidades en todas las vistas nos permite replicar el comportamiento de una aplicación que continuamente está enviando y recibiendo datos desde una base de datos, sin que este sea necesariamente el caso.

Para la realización de la aplicación se ha elegido el framework de _front-end_ llamado _Vue_. Este mezcla los patrones de la aquitectura flux con la programación reactiva buscando mejorar el rendimiento.

La aplicación contiene un _store_ donde se establece la estructura de la información, y donde se llevan a cabo las modificaciones del estado global. El _store_ esta conectado con componentes que mantienen un estado local y se encargan de representar la combinación de estados (local y global) en forma interfaz gráfica.

En Vue, los componentes estan formados por 3 partes:
1. **Script.** El script es un objeto Javascript, que mantiene los datos, los métodos y los observadores del componente. Los datos representan el estado local, los métodos son las acciones que realiza dependiendo de un determinado evento, y los observadores se encargan de realizar acciones cuando los datos cambian.
2. **Plantilla.** Es un DSL que suele representarse en un formato similar al HTML. Es la parte de la vista que describe como se ve una interfaz a partir de un estado. Contiene ciertas herramientas que facilitan la representación de la información.
3. **Estilo.** Describe la apariencia de la plantilla, suele representarse en CSS o lenguaje de preprocesamiento de CSS. Se encarga de colocar los elementos de la plantilla y de estilarlos ya sea estableciendo un color, tamaño de fuente, etc.

## Programación reactiva
La programación reactiva es una de las principales caracteristicas que distinguen a Vue. El estado de los componentes se representa mediante un objeto de Javascript. Cuando el estado cambia, la vista se actualiza. Pero cómo se detectan los cambios?

### Detección de cambios
Cuando se inicializa un componente, Vue lee el objeto del estado y lo reemplaza por _setters_ y _getters_. Estos serán invisibles para el usuario, pero permitirán identificar las dependencias de datos y despachar notificaciones de datos cuando las propiedades del estado sean leídas o modificadas.
Todo componente tiene una instancia de observador (_watcher_), que registra las propiedades de las que depende la interfaz y cuando estas cambian hace que el componente se actualice.

Vue realiza las actualizaciones de manera asíncrona, es decir que un cambio al estado no implica necesariamente otra actualización. Cuando una propiedad que Vue esta observando cambia, se añade a una cola donde se registrarán todos los cambios realizados en el mismo loop de eventos (_event loop_). Si una misma propiedad cambia varias veces dentro del mismo loop de eventos, esta solo se registrará una vez. Esto es muy importante de cara al rendimiento ya que previene actualizaciones innecesarias.