## Introducción
En los últimos 10 años, el desarrollo de aplicaciones web ha evolucionado a pasos agigantados. Entre otras cosas esto se debe a la adopción de los teléfonos móviles inteligentes (_smartphones_), la evolución de los exploradores web, y la mejora continua del principal lenguaje de programación para la web: _Javascript_.

Estos cambios acabaron inclinando el desarrollo de las aplicaciones del servidor hacia el cliente (_explorador web_).

Las primeras aplicaciones desarrolladas del lado de cliente (_aplicaciones frontend_), seguían el patrón de arquitectura modelo-vista-controlador (_MVC_), lo siguieron los patrones modelo-vista-presentador (_MVP_) y modelo-vista-vista-modelo (_MVVM_). Sin embargo, todos estos interpretaban la arquitectura como un conjunto de vistas donde cada una tenía su propio modelo. Esto causaba problemas, principalmente a la hora de sincronizar los modelos entre cada vista. Con el propósito de arreglar esto surgió el patrón de arquitectura `flux`.