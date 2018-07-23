### Flux
El patrón de arquitectura Flux implementa una serie de pautas y buenas prácticas con el objetivo de hacer que las aplicaciones escalen de forma sencilla y ordenada.
A continuación se detallan las principales características de este patrón de arquitectura.

#### Entrada de datos y manipulación de datos
En las arquitecturas MVC el controlador es el encargado del flujo de datos, sin embargo solo se gestiona lo que pase una vez que ya tenga los datos. Como obtiene los datos el controlador en primer lugar? Los datos pueden llegar de distintos orígenes. La vista puede crear datos a partir de eventos de usuario. Un controlador puede crear datos y compartirlos con otro controlador.
Al crecer una aplicación, los puntos donde entran los datos se vuelven muy importantes. Flux se inventó para solucionar este y otros problemas relacionados con aplicaciones de grande escala, de forma que se busca limitar la entrada de datos a un solo lugar.

De igual forma, Flux evita que los controladores y las vistas puedan modificar el _estado_. Cuando hablamos de _estado_ nos referimos a los datos que representan la interfaz gráfica de una aplicación en un momento dado. Es imposible representar una interfaz gráfica solamente con el modelo, es necesario llevar a cabo efectos secundarios sobre los datos, estos efectos secundarios representan el _estado_. Como mantener el _estado_ es imprescindible, Flux argumenta que la mejor forma de hacerlo es limitando quién puede modificar el _estado_ y dónde.

#### Información estructurada
Flux introduce un nuevo elemento llamado _store_ (inglés para almacén). El _store_ es el punto de entrada de los datos al sistema. 
En otras arquitectura, _MVC_ por ejemplo se piensa antes en la implementación que en la información del sistema, al crear un _store_ pensar en la estructura que debe llevar la información es un paso obligatorio.
Toda manipulación de datos se da dentro del _store_. Se puede considerar al _store_ como una fábrica de información donde entran los datos, se estructuran para la necesidad de la aplicación y salen como información.
Los _stores_ controlan como entran los datos y llevan a cabo los cambios de estado.

#### Manipulación de datos síncrona
Además de manejar donde ocurren los cambios al estado, es importante manejar el orden en que estos se llevan a cabo. En un sistema donde los datos se actualizan asíncronamente debemos considerar las condiciones de carrera.

Una condición de carrera se puede definir como un comportamiento anómalo debido a una inesperada dependencia crítica en el orden de ejecución de eventos. [4]

Las condiciones de carrera son problemáticas porque uno de los datos puede depender de otro, y si estos son actualizados en un orden incorrecto el problema se puede propagar en cascada de un componente a otro.
Flux previene las condiciones de carrera asegurandose de que todos los cambios de estado en el _store_ se hagan de manera síncrona.

#### Flujo de datos unidireccional
En las arquitecturas _MV*_ no existen restricciones respecto a la dirección en la que fluyen los datos. Esto significa que un controlador puede cambiar el estado y propagar ese cambio a otro controlador; este a su vez puede volver a cambiar el estado y propagarlo a otros controladores. En una aplicación pequeña esto puede resultar conveniente, sin embargo cuando los datos fluyen en varias direcciones aumenta la posibilidad de que algún componente se quede desactualizado. Cuando una aplicación crece, esta posibilidad incrementa aún mas y entender el origen de los cambios de estado se vuelve casi imposible.

Flux obliga a mantener un flujo de datos unidireccional y por lo tanto elimina la posibilidad de que un componente actualicé los datos en una manera que rompa el sistema. De manera que sin importar el tipo de datos, cuando estos entran o se actualizan fluyen desde el _store_ hacia los componentes, y de estos a sus componentes hijos, bajando por el árbol de componentes hasta llegar al final.

Manteniendo un flujo unidireccional de datos el problema de entender de donde proviene un cambio de estado se simplifica. Esto es porque siempre se debe originar desde _store_, haciendo el flujo de datos predecible.

#### Comunicación entre componentes
Antes de Flux el método de comunicación entre componentes más común era `Publish-Subscriber`. Este método permite la comunicación entre componentes sin tener que acoplarlos. Es muy común utilizarlo porque la mayoría de los intercambios de datos en las aplicaciones `front-end` se desencadenan de eventos de usuario.

`Publisher-Subscriber` o también conocido como `Pub-Sub` funciona de la siguiente manera:
- Un controlador sufre un cambio de estado del que otros controladores dependen.
- Despacha un evento comunicando el cambio de estado.
- Cualquier controlador que dependa de estos datos, escucha el cambio de estado y lo gestiona internamente.

De tal manera que el controlador que sufre el cambio de estado original, publica sus cambios y se desentiende. Y los controladores que necesitan actualizarse, deben de gestionar las suscripciones a los datos que le interese.

El principal problema con esto, es que se crea una dependencia de datos entre controladores que no es fácil de crecer. También se dan casos donde el suscriptor solo desea escuchar eventos en ciertos momentos, por lo que debe suscribirse y darse de baja dependiendo de alguna condición; a la larga esto genera problemas de consistencia.

La solución que propone Flux es mantener un canal único de comunicaciones entre componentes. Canal que notificará a todos los componentes del sistema. De forma que no es responsabilidad de un componente decidir que a eventos escuchar, sino que tiene que decidir cuales notificaciones le son relevantes y cuales ignorar.

#### Comunicación entre capas
Flux separa el sistema en capas (_acciones, stores y vistas_), y establece un sentido único en el que se pueden comunicar las capas. Al asegurarse que una capa solo puede comunicarse con la capa directamente debajo, se eliminan todos los errores causados por hacer algo en un orden incorrecto.

Un detalle muy importante de Flux es que no se preocupa por la manera en la que se representen las vistas. La capa de la vista esta muy poco acoplada al resto de capas. Esto se debe a que si se acopla la vista al resto de las capas. La estructura de la información será influenciada por la manera de representarla en la vista, que en futuro puede resultar poco mantenible.

### Flux - Implementación
#### Acciones
La primera capa de Flux son las acciones. Una acción es algo que queremos que la aplicación haga. Por ejemplo:
- Obtener el usuario.
- Activar un filtro.
- Seleccionar un elemento.

Como se representan las acciones dentro de Flux? Para crear una acción basta con darle un nombre que represente el comportamiento que se desea llevar a cabo. Normalmente una acción se representa como un objeto que tiene un _tipo_ y un _payload_ (se refiere al contenido que lleva la acción).
Se puede pensar en las acciones como si fueran paquetes de mensajería, estas son solo el medio para distribuir nuevos datos dentro del sistema. En Flux, todo se desencadena desde una acción; si un cambio de estado no se incluye en una acción, no se lleva a cabo.

Una típica acción puede verse así:
```js
{
  type: "CREAR_CONTACTO",
  payload: {
    name: "John",
    lastname: "Smith",
    address: "Av. Castellana 1234"
  }
}
```
Donde `type` representa el tipo de acción a llevar a cabo, y `payload` contiene los datos necesarios para llevar a cabo la acción.

#### Despachador
El despachador se encarga de distribuir las acciones dentro del sistema; este tiene que entregar las acciones a los _stores_.
Se podría decir que el _dispatcher_ (inglés para despachador) no es una capa del sistema, simplemente actúa como intermediario entre capas.

Es imprescindible saber que solo existe un _dispatcher_ dentro del sistema, y que cuando una acción es despachada esta llegará a todos los stores del sistema.

#### Store
Una _store_ es donde se mantiene el estado de la aplicación. Una de las características más importantes del _store_ es que no existe lógica externa que determine si un cambio de estado es necesario. Solamente el _store_ decide si es necesario y puede llevar a cabo un cambio de estado.

#### Vista
Al igual que en la arquitectura _MVC_ y similares (_MV*_), la vista se encarga de representar los datos en la interfaz gráfica. La principal diferencia entre Flux y sus predecesores es como interpretan la gestión de eventos de usuario.

Una vista clásica no tiene restricciones respecto a como se comunica con otros componentes. Por ejemplo, al interactuar con una vista, esta puede invocar un método en un controlador, cambiar el estado de un modelo o leer el estado de otra vista.
En cambio, una vista en Flux solo puede despachar nuevas acciones. Esto consigue que la entrada de datos al sistema sea solo una, sin importar si los datos vienen de una API o de un evento lanzado por el usuario.

Para Flux la implementación de la vista no es importante siempre y cuando esta respete el flujo unidireccional de datos.

#### _Flux_ en retrospectiva
Flux es una serie de patrones que busca a través de ciertas normas y restricciones mantener un sistema que pueda crecer de manera mantenible. Impone una entrada de datos única y un flujo unidireccional de datos, establece que capas pueden comunicarse y en que sentido. Todas estas reglas, pueden parecer inconvenientes al inicio pero con el tiempo mantienen la cordura en los proyectos.