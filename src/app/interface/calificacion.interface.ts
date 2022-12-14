import { Asignacion } from "./asignacion.interface";
import { Estudiante } from "./estudiante.interface";
import { Materia } from "./materia.interface";

export interface Calificacion {
    id: number
    idEstudiante: number;
    idMateria: number;
    valor: number | null;
}