# Publicar un Módulo de NestJS como una libreria

Para publicar un módulo de NestJS como una libreria implica varios pasos, incluyendo:
 - Configuración de módulo
 - Preparar módulo para distribución
 - Publicarlo en un registro de paquetes como npm

## Paso 1: Crear Módulo de NestJS

1. Configurar nuevo proyecto NestJS:

> nest new mi-biblioteca-nestjs
> cd mi-biblioteca-nestjs

2. Generar módulo:

> nest generate module mi-modulo

3. Agregar Servicios y Controladores: Implementa la funcionalidad que deseas en tu módulo agregando servicios, controladores y cualquier otro componente necesario.

## Paso 2: Preparar modulo para Publicación

1. Crear Archivo `package.json`: Asegúrate de que tu módulo tenga un archivo `package.json` en el directorio raíz. Si no tienes uno, puedes crearlo usando:

> npm init

Completa los detalles necesarios, como:

  - name: El nombre de tu libreria (por ejemplo, mi-biblioteca-nestjs).
  - version: La versión de tu libreria (por ejemplo, 1.0.0).
  - main: El punto de entrada de tu libreria (por ejemplo, dist/mi-modulo.js).
  - types: El archivo de definición de TypeScript (por ejemplo, dist/mi-modulo.d.ts).

2. Agrega Scripts de Construcción: En tu package.json, agrega scripts para construir tu libreria:

```json
"scripts": {
  "build": "tsc",
  "prepublish": "npm run build",
  "build:all": "npm run build:all",
  "publish:all": "npm run publish:all"
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

> npm run build:all

Esto compilará todas las librerias y módulos en el proyecto.

## Paso 4: Publicar libreria

Para publicar todas las librerias, puedes usar el siguiente comando:

> npm run publish:all

Esto construirá y publicará todas las librerias en el registro de npm.

Para publicar una libreria específica, puedes usar:

> npm run publish:lib

## Paso 5: Usar libreria

Una vez publicada, puedes instalar tu libreria en otros proyectos de NestJS usando:

> npm install mi-biblioteca-nestjs

## Consejos Adicionales

 - Versionado: Sigue el versionado semántico (semver) para tu libreria. Actualiza la versión en package.json antes de cada publicación.
 - Documentación: Proporciona documentación clara en un archivo README.md para ayudar a los usuarios a entender cómo usar tu libreria.
 - Pruebas: Asegúrate de que tu libreria esté bien probada antes de publicarla. Considera usar un marco de pruebas como Jest.
 - Integración Continua: Configura pipelines de CI/CD para automatizar los procesos de prueba y publicación.

Siguiendo estos pasos, podrás publicar con éxito tu módulo de NestJS como una libreria, haciéndola disponible para que otros la utilicen en sus aplicaciones.
