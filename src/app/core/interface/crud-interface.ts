import { Observable } from "rxjs"

export interface CrudInterface<T> {
    getAll(): Observable<T[]>
    getById(id: number): Observable<T>
    add(obj: T): Observable<T>
    delete(id: number): Observable<T>
    update(id: number, obj: T): Observable<T>
}
