---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "nestjs-release-base"
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

# Publicar un Módulo de NestJS como una libreria

Para publicar un módulo de NestJS como una libreria implica varios pasos, incluyendo:
 - Configuración de módulo
 - Preparar módulo para distribución
 - Publicarlo en un registro de paquetes como npm

## Paso 1: Crear Módulo de NestJS

1. Configurar nuevo proyecto NestJS:

>nest new mi-libreria-nestjs
>cd mi-libreria-nestjs

2. Generar módulo:

>nest generate module mi-modulo

3. Agregar Servicios y Controladores: Implementa la funcionalidad que deseas en tu módulo agregando servicios, controladores y cualquier otro componente necesario.

## Paso 2: Preparar modulo para Publicación

1. Crear Archivo `package.json`: Asegúrate de que tu módulo tenga un archivo `package.json` en el directorio raíz. Si no tienes uno, puedes crearlo usando:

>npm init

Completa los detalles necesarios, como:

  - name: El nombre de tu libreria (por ejemplo, mi-libreria-nestjs).
  - version: La versión de tu libreria (por ejemplo, 1.0.0).
  - main: El punto de entrada de tu libreria (por ejemplo, dist/mi-modulo.js).
  - types: El archivo de definición de TypeScript (por ejemplo, dist/mi-modulo.d.ts).

2. Agrega Scripts de Construcción: En tu package.json, agrega scripts para construir tu libreria:

```json
"scripts": {
  "build": "tsc",
  "prepublish": "npm run build"
}
```

3. Crea un Archivo `tsconfig.json`: Crear archivo de configuración de TypeScript para compilar tu código TypeScript en directorio raiz. Ejemplo básico:

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## Paso 3: Construir libreria

Ejecutar el comando de construcción para compilar código TypeScript en JavaScript:

>npm run build

## Paso 4: Publicar libreria

Iniciar sesión en npm:

>npm login

Publicar libreria: Usa el siguiente comando para publicar tu libreria en npm:

>npm publish

Para publicar una versión previa (por ejemplo, 1.0.0-alpha.0), puedes usar:

>npm publish --tag alpha

## Paso 5: Usar libreria

Una vez publicada, puedes instalar tu libreria en otros proyectos de NestJS usando:

>npm install mi-libreria-nestjs


## Consejos Adicionales

 - Versionado: Sigue el versionado semántico (semantic-release) para tu libreria. Actualiza la versión en package.json antes de cada publicación.
 - Documentación: Proporciona documentación clara en un archivo README.md para ayudar a los usuarios a entender cómo usar tu libreria.
 - Pruebas: Asegúrate de que tu libreria esté bien probada antes de publicarla. Considera usar un marco de pruebas como Jest.
 - Integración Continua: Configura pipelines de CI/CD para automatizar los procesos de prueba y publicación.

Siguiendo estos pasos, podrás publicar con éxito tu módulo de NestJS como una libreria, haciéndola disponible para que otros la utilicen en sus aplicaciones.