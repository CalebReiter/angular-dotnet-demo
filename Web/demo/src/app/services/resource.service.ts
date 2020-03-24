import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  private baseUrl = 'http://localhost:5002/api/Resources';

  constructor(private http: HttpClient) { }

  getResource(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createResource(resource: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, resource);
  }

  getResourceList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}