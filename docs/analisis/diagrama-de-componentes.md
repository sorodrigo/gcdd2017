# Diagrama de Componentes

![Diagrama de Componentes](../assets/d_componentes.png)

El diagrama de componentes es otra forma de pensar en las clases y dependencias del sistema. De forma que se considera como componente a la combinación de controlador y vista. Esta encapsulación permite representar la aplicación en función de la interfaz gráfica.

A simple vista se puede apreciar la profundidad del árbol de componentes de la aplicación y la relación entre cada componente. Como podemos observar a primer nivel se encuentra el componente App, este tiene 3 hijos que corresponden a distintos RouterView. El RouterView es una instancia del mediador que dependiendo del estado de la aplicación mostrará un component u otro.

Después dentro del RouterView principal tenemos los componentes a nivel de página. Cada uno de estos componentes representa una página dentro de nuestra aplicación. Algunos representan toda la interfaz gráfica de dicha página y otros contienen otro componente hijo que representa una porción de dicha página.

Por ejemplo, las páginas Home, Table y Form contienen como hijos a VueMarkdown, VClientTable y VueFormGenerator.

VueMarkdown es un componente de terceros que se encarga de convertir un texto markdown en html.
VClientTable es un componente de terceros que se encarga de pintar una tabla a partir de ciertos datos y opciones proporcionadas.
VueFormGenerator es un componente de tercers que se encarga de pintar y gestionar la validación de formularios a partir de un esquema proporcionado.