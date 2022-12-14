import { Calificacion } from "./calificacion.interface";

export interface Materia {
    id: number;
    nombre: string;
    calificacions: Calificacion[];
}