# Husky

Husky es una herramienta que permite gestionar hooks de Git, lo que significa que puedes ejecutar scripts en diferentes momentos del ciclo de vida de Git, como antes de hacer un commit o un push. Esto es útil para asegurarte de que el código cumple con ciertas reglas antes de ser enviado al repositorio.

## 1. **Instalación**

Para instalar husky se necesita correr el siguiente comando:

```bash
npm install husky --save-dev
```

Ademas se recomienda correr el siguiente para simplificar el seteo del proyecto:

```bash
npx husky init
```

Esto crea la carpeta `.husky` en tu proyecto y un `pre-script` asi como actualizar el `package.jason` con el script "prepare"

## 2. **Configuración de hooks**



