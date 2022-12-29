# MisClases 

Prueba Técnica

## Herramientas
- Angular: 14.2.12
- ng-Bootstrap
- Bootstrap-icon

## Descripción

Mis Clases es una app que permitirá a un maestro lleva el control de sus estudiantes y sus calificaciones de  las distintas materias y se calcule su literal.

### Literales
- A = 90 -100
- B = 80 - 89
- C = 70 - 79
- F = 0 - 69

Además de realizar el pase de lista, en el mismo se debe ver un historial del pase de lista por día.

## Vistas
### Inicio  
![Home](https://user-images.githubusercontent.com/77866123/210020532-1d9bc068-9f79-46d7-823d-3edebdbc407c.gif)

En esta vista se pueden ver y agregar `Materias` 

### Materia
![subject](https://user-images.githubusercontent.com/77866123/210021183-9443f61a-c5d2-4cbe-8d6d-f5ee7594b41a.gif)

### Pase de lista
![takeAttender](https://user-images.githubusercontent.com/77866123/210021765-89baf657-1149-4ead-9b26-3538c693d23f.gif)

### Estudiantes
![student](https://user-images.githubusercontent.com/77866123/210022227-3bffb924-1edc-437d-b579-bdd1a1b8c9d2.gif)

## Probar el proyecto

Para poder ejecutar él proyectó, necesita obtener la [API AdministradorEstudiante](https://github.com/JuniorSamuel/AdministradorEstudianteAPI) desarrollada en ASP.Net Core para este app. 

### Ajustes para ejecutar correctamente

- Colocar la URL del API en `environment.urlAPI` del archivo `src\environments\environment.ts`.
- Instalar las dependencias: `npm i`
- Ejecutar mediante `ng serve -o`


