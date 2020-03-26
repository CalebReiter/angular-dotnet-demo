import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Skill {
  id?: number
  SkillName: string
}

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private baseUrl = 'http://localhost:5000/api/Skills';

  constructor(private http: HttpClient) { }

  getSkill(id: number): Observable<Skill> {
    return this.http.get<Skill>(`${this.baseUrl}/${id}`);
  }

  deleteSkill(id: number): Observable<Skill> {
    return this.http.delete<Skill>(`${this.baseUrl}/${id}`);
  }

  updateSkill(id: number, skill: string): Observable<Skill> {
    return this.http.put<Skill>(`${this.baseUrl}/${id}`, skill);
  }

  createSkill(skill: Skill): Observable<Skill> {
    return this.http.post<Skill>(`${this.baseUrl}`, skill);
  }

  getSkillList(): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.baseUrl}`);
  }
}