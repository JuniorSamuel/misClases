import { Calificacion } from "./calificacion.interface";

export interface Asignacion {
    id: number;
    nombre: string | null;
    valor: number | null;
    descripcion: string | null;
    calificacions: Calificacion[];
}