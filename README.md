# Aplicación Próxima Energía

Esta aplicación trata de una página desde la que pueden gestionarse los acuerdos comerciales.
Desde ella se puede Añadir un acuerdo comercial, borrar uno o varios acuerdos comerciales,
editar un acuerdo comercial y asociar las diferentes tarifas comerciales a un acuerdo.

## Como probar la aplicación

Es neceario en un princpio ejecutar el comando yarn install para que se instalen los paquetes de node_modules
necesarios para poder ejecutarla.
Es necesario también descargar el proyecto ProximaEnergiaBack del repositorio y arrancar la api (configurando el 
acceso a la base de datos).

Para poder probar será necesario abrir el proyecto en Visual Studio Code y ejecutar en la terminal el comando yarn dev.
Una vez hecho esto en la consola nos aparecerá una direccion localhost que habrá que meter en el navegador para ver 
la pantalla inicial de la aplicación.

De esta forma se podrá depurar o ver por donde pasa el código.
















# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
