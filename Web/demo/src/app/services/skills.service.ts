import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  private baseUrl = '';

  constructor(private http: HttpClient) { }

  getSkill(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createSkill(skill: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, skill);
  }

  getSkillList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}