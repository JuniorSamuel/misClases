# MisClases 

Projecto de prueba Tecnica

## Herramientas
- Angular: 14.2.12
- ng-Bootstrap
- Bootstrap-icon

## Descripcion

Mis Clases esuna app que permitira a un maestro lleva el control de sus estudiantes y sus calificaciones de  las distintas materias y se calcule su literal.

### Literales
- A = 90 -100
- B = 80 - 89
- C = 70 - 79
- F = 0 - 69

Ademas de realizar el pase de lista, en el mismo se 
debe ver un historial del pase de lista por día.

## Probar el proyecto

Para poder ejecutar el proytecto, necitar obtener la [API AdministradorEstudiante](https://github.com/JuniorSamuel/AdministradorEstudianteAPI) desarollada en ASP.Net Core para este app. 

### Ajustes para ejecutar correctamente

- Colocar la URL del API en `environment.urlAPI` del archivo `src\environments\environment.ts`.
- Instalar las dependencia: `npm i`
- Ejecutar mediante `ng serve -o`



