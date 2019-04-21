### Modelo Vista Controlador (_MVC_)
El patrón MVC promueve una organización mediante la separación de conceptos. El modelo de la aplicación se encarga de mantener los datos y la lógica de negocio. La vista se encarga de la interfaz de usuario, es la representación gráfica del modelo. Finalmente el controlador se encarga de conectar la vista con el modelo, para conseguirlo gestiona los eventos producidos por el usuario y actualiza el modelo cuando sea necesario.

El patrón de diseño se inventó en los años 70s para el lenguaje de programación Smalltalk. El objetivo principal era desacoplar la lógica de negocio (modelo) de la interfaz gráfica para poder reutilizar los modelos con distintas interfaces.

#### Modelo
El modelo gestiona los datos de una aplicación. Estos datos son agnósticos respecto a la vista. El modelo debe de ser capaz de representar toda la lógica de negocio, y el comportamiento de la aplicación sin que la vista se involucre. Cuando un modelo cambia, debe notificar a sus observadores (vistas) para que estos se actualicen apropiadamente.

#### Vista
La vista suele ser una representación gráfica del modelo. Estas suelen mantener un estado que representa las interacciones que ha llevado a cabo el usuario. Es importante diferenciar el modelo y el estado. A diferencia del modelo, el estado no representa la lógica de negocio, sino que la lógica de la aplicación. Cuando el modelo se modifica, la vista recibe una notificación para actualizarse, este mecanismo permite que las vistas permanezcan _tontas_. Se dice que una vista es _tonta_ cuando no conoce la implementación, y se dedica exclusivamente a la presentación del modelo. Una aplicación que siga el patrón de diseño _MVC_ debe buscar mantener siempre tontas las vistas.

Los usuarios pueden interactuar con la vista para leer, o editar datos que representan al modelo. Al hacer modificaciones, el modelo se debe actualizar. En una aplicación _MVC_, esta tarea pertenece al controlador.

#### Controlador
El controlador actúa como intermediario entre el modelo y la vista. Normalmente un modelo se encarga de actualizar la vista cuando el modelo cambia y de actualizar el modelo cuando el usuario interactúa con la vista.

En las aplicaciones frontend, la implementación del controlador no suele corresponder con la definición clásica de _MVC_.
Cuando se portó el patrón _MVC_ al frontend, los ejemplos venían de aplicaciones de escritorio y aplicaciones backend. Sin embargo, con el paso del tiempo se empezó a divergir de esta implementación. Esto se dio principalmente porque una aplicación frontend no se podía representar en la misma manera que una de escritorio/backend. La implementación del controlador empezó a cambiar, algunos frameworks incluso lo reemplazaron con otros elementos. No tenía sentido llamar controlador a algo que no ejercía de controlador en la definición clásica. Y así se dio paso a los patrones _MVP_, _MVVM_ y _MV*_.

####  _MVC_ en retrospectiva
_MVC_ es un patrón de diseño que aplica la separación de conceptos. Utiliza el patrón observador para comunicar las diferentes capas y mantenerlas actualizadas. Al separar los conceptos, es fácil determinar que parte es responsable de que cosa. Tener encapsuladas las vistas y el modelo incrementa la reutilización de código.