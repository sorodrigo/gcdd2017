### Modelo Vista Vista-Modelo (_MVVM_)
El _MVVM_ es un patrón de diseño basado en _MVC_ y en _MVP_ que busca separar el desarrollo de interfaces gráficas del desarrollo de la lógica de negocio. Existen distintas implementaciones, pero la base de todas estas es el _data-binding_.

#### Data binding
"Data binding es el proceso que establece una conexión entre la interfaz gráfica de la aplicación y la lógica de negocio. Si la conexión tiene las opciones correctas y los datos proveen las notificaciones adecuadas, entonces cuando los datos cambien, los elementos que están conectados a esos datos reflejarán los cambios automáticamente. Data binding también significa que si una representación externa de los datos en un elemento cambia, entonces los datos relacionados también pueden actualizarse automáticamente."[2]

El _data-binding_ permite separar la lógica de las vistas del resto de la aplicación.

#### Modelo
El modelo al igual que en sus predecesores se encarga de mantener la información de la aplicación. Mantienen la información pero no se encargan del comportamiento. No se encargan de darle formato a la información, esta responsabilidad cae sobre la vista. El único comportamiento que suele tener la vista es la validación de los datos. El resto del comportamiento, es decir la lógica de negocio, corresponde a la vista-modelo.

#### Vista
La vista es la capa que representa la interfaz con la que los usuarios interactúan. Las vistas representan el estado de la vista-modelo, incluyen data-bindings y eventos, por esto se consideran vistas activas. La gestión del estado se delega a la vista-modelo.

#### Vista-Modelo
La vista-modelo se puede considerar un intermediario entre la vista y el modelo. Una de las principales tareas de la vista-modelo es adaptar la información del modelo a los casos específicos de la vista. El modelo suele contener la información en un formato genérico, mientras que la vista necesita mostrar los datos de distintas maneras dependiendo de la interfaz y el estado interno. Así la vista-modelo se encarga de convertir el modelo en información que la vista puede utilizar.
La vista-modelo también expone métodos para:
    - Actualizar el estado de la vista.
    - Actualizar el modelo a través de acciones en la vista.
    - Despachar eventos en la vista.
