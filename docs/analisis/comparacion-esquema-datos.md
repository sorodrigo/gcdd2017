# Comparación con Esquema de Datos

El modelo de datos en este proyecto muestra la estructura en la que se organiza el esquema de datos de una forma más familiar. No existe una base de datos como tal que ejerza dicho modelo, más bien representa la forma en la que se comunica el sistema con los datos proporcionados por el usuario y la capa de configuración.

Ahora haremos una comparación entre el modelo de datos previamente descrito y el esquema de datos que usa el sistema en la realidad. Con esto buscamos aclarar la razón de existir del sistema y como funciona.

## Entidades
Como mencionamos previamente, en el modelo de datos existen 5 entidades: Entidad de Datos, Usuario, App, Acción y Entrada de Datos. De estas cinco entidades, se representan a primer nivel y de forma explícita dentro del esquema las primeras tres.

La propiedad `app` equivale a la entidad `App`, la propiedad `entities` equivale a la entidad `Entidad de Datos` y la propiedad `auth` equivale a la entidad `Usuario`.
```json
// entidades - datasource.schema.json
{
  "app": {...},
  "entities": {...},
  "auth": {...}
}
```

A continuación tenemos la representación de la entidad App dentro del esquema. Como podemos observar, contiene las propiedades `name` y `home`.
- La propiedad `name` contiene el nombre de la aplicación. Este se utiliza para identificar la app de cara al explorador web.

- La propiedad `home.content` contiene el contenido a mostrar en la página de inicio en formato markdown.

- La propiedad `home.resolveContent` contiene una dirección web de donde descargará el contenido de la página de inicio en formato markdown. No es necesario declar ambas, en este caso se hace a modo de ejemplo.
```json
// propiedades (App) - datasource.schema.json
{
  "app": {
    "name": "Aplicación de TFG",
    "home": {
      "content": "# Bienvenido a Aplicación de TFG",
      "resolveContent": "http://api.example.com/markdown/home.md"
    }
  },
  "entities": {...},
  "auth": {...}
}
```

Dentro de la propiedad `entities` se encuentran definidas cada una de las entidades de datos. Podemos observar que se usa la propiedad `nombre` como clave para distinguirlas.
Dentro de cada entidad encontramos las siguientes propiedades:
- La propiedad `auth` distingue entre las entidades que estan protegidas por autenticación y las que no.

- La propiedad `heading` contiene el texto a mostrar dentro de cada página de entidad.

- La propiedad `columns` contiene las columnas de datos a mostrar en la tabla de datos.

- La propiedad `prefetch` contiene los nombres de las entidades que contienen los datos necesarios para mostrar una página de entidad. Es decir, representa las relaciones entre entidades de datos.

- La propiedad `mapRelations` determina si mostrar los datos de las relaciones como claves foráneas o como valores. En caso de ser verdadero, se debe de proporcionar el valor equivalente en el esquema de configuracion de la tabla de datos (_table.schema.json_).

- Las propiedades `showView`, `showCreate`, `showEdit` y `showDelete` representan a las acciones relacionadas con la entidad. Son opcionales, si no se definen se tomarán valores por defecto. Pueden representarse con booleanos que determinan si una acción se puede llevar a cabo o no; O pueden represetarse mediante un objeto con dos propiedades. La propiedad `path` representa la ubicación donde buscar el valor, y la propiedad `value` representa a que debe equivaler el valor para poder llevar a cabo la acción.
```json
// propiedades (Entidad de Datos) - datasource.schema.json
{
  "app": {...},
  "entities": {
    "grados": {...},
    "estudiantes": {
      "auth": true,
      "heading": "Gestionar Estudiantes",
      "columns": ["id", "nombre", "apellidos", "grado"],
      "prefetch": ["grados"],
      "mapRelations": true,
      "showView": false,
      "showCreate": { "path": "role", "value": "ADMIN" },
      "showEdit": { "path": "role", "value": "ADMIN" },
      "showDelete": { "path": "role", "value": "ADMIN" }
    }
  },
  "auth": {...}
}
```

Dentro de la propiedad `auth` se encuentran dos propiedades que dividen el proceso de autenticación en petición y respuesta. Dentro de estas dos propiedades se encuentran las propiedades que representan a la entidad Usuario en el modelo de datos.
- La propiedad `request.url` contiene un texto con la dirección web a donde enviar la perición de autenticación.

- La propiedad `request.user` contiene un valor de texto que representa el nombre de la propiedad que espera el servidor de autenticación como identificador de usuario.

- La propiedad `request.password` contiene un valor de texto que representa el nombre de la propiedad que espera el servidor de autenticación como contraseña.

- La propiedad `response.payload` contiene un valor de texto que representa la ubicación donde se encuentran los datos de usuario dentro de la respuesta del servidor.
```json
// propiedades (Usuario) - datasource.schema.json
{
  "app": {...},
  "entities": {...},
  "auth": {
    "request": {
      "url": "http://api.example.com/auth",
      "user": "username",
      "password": "password"
    },
    "response": {
      "payload": "data"
    }
  }
}
```

Como podemos ver en la práctica mediante el esquema de datos podemos representar todas las entidades, propiedades y relaciones del modelo de datos.
