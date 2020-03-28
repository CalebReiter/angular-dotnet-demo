import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface View<T> {
  pages: number,
  page: number,
  top: number,
  items: T[]
}

export interface Resource {
  Id?: number
  name: string
  skills: string
}

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  private baseUrl = 'http://localhost:5002/api/Resources';

  constructor(private http: HttpClient) { }

  getResource(id: number): Observable<Resource> {
    return this.http.get<Resource>(`${this.baseUrl}/${id}`);
  }

  deleteResource(id: number): Observable<Resource> {
    return this.http.delete<Resource>(`${this.baseUrl}/${id}`);
  }

  updateResource(Resource: Resource): Observable<Resource> {
    return this.http.put<Resource>(`${this.baseUrl}/${Resource.Id}`, Resource);
  }

  createResource(Resource: Resource): Observable<Resource> {
    return this.http.post<Resource>(`${this.baseUrl}`, Resource);
  }

  getResourceList(): Observable<Resource[]> {
    return this.http.get<Resource[]>(`${this.baseUrl}`);
  }

  loadPage(top: number, page: number, q: string) {
   return this.http.get<View<Resource>>(`${this.baseUrl}/?top=${top}&page=${page - 1}&q=${q}`);
  }
}