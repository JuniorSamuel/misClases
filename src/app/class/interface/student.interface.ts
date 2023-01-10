import { Score } from "./score.interface";
import { Attendance } from "./attendance.interface";

export interface Student {
    id: number;
    name: string;
    lastName: string;
    comment: string;
    scores: Score[];
    attendances: Attendance[];
}