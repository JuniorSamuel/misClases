import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export class Crud<T>{

    constructor(private http: HttpClient, private url: string){}
    getAll(url:string = ""): Observable<T[]> {
        return this.http.get<T[]>(`${this.url}${url}`);
    }
    getById(id: number): Observable<T> {
        return this.http.get<T>(`${this.url}/${id}`);
    }
    add(obj: T | T[]): Observable<T|any> {
        return this.http.post<T>(`${this.url}`, obj);
    }
    delete(id: number): Observable<T> {
       return this.http.delete<T>(`${this.url}/${id}`);
    }
    update(id: number, obj: T): Observable<T> {
        return this.http.put<T>(`${this.url}/${id}`,obj);
    }


}
