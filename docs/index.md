---
# https://vitepress.dev/reference/default-theme-home-page
layout: doc

guide:
  name: "template-module-nodejs"
  text: "Publicación de modulos como librerias"
---

# Guia de Publicación de Modulos como Librerias

## Librerias relevantes
- [Husky](https://github.com/typicode/husky)
- [Commitizen](https://github.com/commitizen/cz-cli)
- [Semantic-release](https://github.com/semantic-release/semantic-release)

### Husky
  
  Husky es una herramienta que permite gestionar hooks de Git, lo que significa que puede ejecutar scripts en diferentes momentos del ciclo de vida de Git, como antes de hacer un commit o un push.

  Se utiliza para asegurar que el código cumple con ciertas reglas antes de ser enviado al repositorio, como ejecutar pruebas o linters permitiendo automatizar tareas y mejorar la calidad del codigo.

  * Se recomienda utilizar el comando `npm run prepare` despues de cada instalacion

#### Uso

  Para utilizar husky es necesario saber que husky realiza sus procedimientos a traves de archivos con los mismos nombres de los hooks de git.
  
  ![An image](./husky_1.png#center)

  
  - Por ejemplo, para ejecutar un script antes de hacer un commit, se debe crear un archivo de manera manual o con el comando `npx husky .husky/<hook> "<acción a realizar> npx test"` con el nombre pre-commit, estos estaran disponibles en la carpeta `.husky/`. Normalmente los scripts contendran comandos `npm run` o `npx`, pero tambien se puede utilizar POSIX shell.

  - Los hooks de Husky se pueden probar agregando `exit 1` al final del archivo a testear, esto hara que el hook falle y se muestre un mensaje de error.

### Commitizen
 
 Commitizen es una herramienta que ayuda a crear mensajes de commit de manera estructurada y amigable, guiando a los desarrolladores a seguir convenciones específicas.

 Esta libreria facilita la creación de mensajes de commit claros y consistentes, permitiendo estandarizar y facilitar la creacion de comits, lo que es especialmente útil en proyectos colaborativos.

 #### Uso

  Al momento de realizar un comit, se debe:

  - Reemplazar comando `git commit` por `npm run cm`. Esto permitira desplegar la interfaz de commitizen la cual te guyiara paso a paso para crear un commit adecuado.

  ![An image](./commitizen_1.png)

  - Selecciona el tipo de cambio que deseas realizar (por ejemplo, "feat" para una nueva funcionalidad) y sigue los pasos indicados Commitizen te guiará a través del proceso de creación del mensaje de commit, asegurando que el mensaje cumpla con las convenciones establecidas.

  ![An image](./commitizen_2.png)

### Semantic-release

  Semantic-release es una herramienta que automatiza el versionado y la publicación de paquetes. Utiliza el análisis de los mensajes de commit para determinar el tipo de versión que se debe lanzar (mayor, menor, o parche).

  Esta herramienta permite mantener un changelog actualizado y gestionar el versionado semántico de manera automática, facilitando el proceso de lanzamiento de nuevas versiones.

  La configuracion de esta herramienta se encuentra en el archivo `.releaserc.js`, este contempla configuracion para ambiente local y CI.

  Es posible realizar una simulación del proceso de release, permitiéndo verificar que todo esté configurado correctamente sin realizar cambios reales utilizando el argumento `--dry-run`

  Por otro lado, esta herramienta automatiza el flujo de release, basado el la nomeclatura de de ramas, referirse a [documentación de flujo](https://semantic-release.gitbook.io/semantic-release/usage/workflow-configuration)

  Para más detalles sobre los plugin de semantic-release, puedes consultar la [documentación oficial](https://semantic-release.gitbook.io/semantic-release/).

  * Al realizar merge a ramas que utilizen semantic-release se recomienda utilizar la opcion `--no-ff`

  * Por defecto, semantic releease esta configurado solo para publicar a npm desde la branc "main", para publicar versiones de prerelese es necesario habilitar la variable de entornro `PUBLISH_PRERELEASES=true`

## Publicar un Módulo de NestJS como una libreria

Para publicar un módulo de NestJS como una libreria implica varios pasos, incluyendo:
 - Configuración de módulo
 - Preparar módulo para distribución
 - Publicarlo en un registro de paquetes como npm

### Paso 1: Crear Módulo de NestJS

1. Crear módulo tipo lib o podificar el de ejemplo:

> nest g lib <nombre del módulo>

2. Agregar Servicios y Controladores: Implementa la funcionalidad que deseas en tu módulo agregando servicios, controladores y cualquier otro componente necesario.

* Tambien es posible crear un módulo de NestJS con el comando `nest g mod <nombre del módulo>` seleccionando src. para publicarlo es necesario tulizar el comando: `npm run build:mod --name=<module-name>`

### Paso 2: Preparar modulo para Publicación

1. Modificar Archivo `package.json` del  directorio raíz cambiando:

  - name: El nombre de tu libreria (por ejemplo, mi-libreria-nestjs) si posee scope debe partir con @<scope>/<library-name>.
  - version: 1.0.0.

### Paso 3: Construir libreria

Ejecutar el comando de construcción para compilar:

```bash
npm run build
```

Una vez compilado es posible probar la libreria de manera local.

### Paso 4: Gestión de Ramas y Versionado

El proyecto utiliza semantic-release para gestionar versiones siguiendo el siguiente flujo de ramas:

- `alpha`: Versiones de desarrollo temprano (ej: 1.0.0-alpha.1)
- `beta`: Versiones de prueba (ej: 1.0.0-beta.1)
- `next`: Versiones de pre-lanzamiento (ej: 1.0.0-next.1)
- `main`: Versiones de producción (ej: 1.0.0)

#### Flujo de trabajo:

1. Desarrollo en rama alpha:
```bash
git checkout -b alpha
git commit -m "feat: nueva característica"
git push origin alpha
# Genera version 1.0.0-alpha.1
git checkout -b beta
git merge alpha
git push origin beta
# Genera version 1.0.0-beta.1
git checkout -b next
git merge beta
git push origin next
# Genera version 1.0.0-next.1
git checkout main
git merge next
git push origin main
# Publica version 1.0.0 en npm
```
Solo la rama main publicará el paquete en npm. Las otras ramas generarán versiones pero no publicarán.

### Paso 5: Publicar libreria

1. Configurar, en caso de que no lo hayas hecho las variables de entorno en .env:
- `REGISTRY_SCOPE`
- `REGISTRY_URL`
- `REPOSITORY_URL`
- `NPM_TOKEN`

Publicar utilizando git push para que se vaya por el flujo de semantic release `git push`, semantic release se encargara de realizar el versionado y publicación en npm.

2. Realiza git push a la rama correspondiente:

 - Para testing: push a alpha o beta
 - Para pre-release: push a next
 - Para producción: push a main

semantic-release se encargará del versionado y publicación según la rama.
Para verificar la versión actual:

```bash
npm run get:version
```

### Paso 6: Usar libreria

Una vez publicada, puedes instalar tu libreria en otros proyectos de NestJS usando:

```bash
npm install mi-libreria-nestjs
```

# A considerar
- La publicacion de la libreria se gestiona a traves de semantic-release, de acuerdo a las branch y los commits, por lo que no se recomienda publicar manualmente
- Para realizar un build limpio reconocible por el flujo automatizado de CI, es necesario que la libreria sea unica dentro de la carpeta libs
- La actualizacion de la version de realiza automaticamente por semantic release pero no se ve reflejada ya que el verdadero versionado es realizado por CI para obtener la version correcta utilizar script: `npm run get:version`