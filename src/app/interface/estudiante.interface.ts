import { Calificacion } from "./calificacion.interface";
import { Lista } from "./lista.interface";

export interface Estudiante {
    id: number;
    nombre: string;
    apellido: string;
    comentario: string;
    calificacions: Calificacion[];
    lista: Lista[];
}