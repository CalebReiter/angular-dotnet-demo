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

  private baseUrl = 'https://localhost:5001/api/Skills';

  constructor(private http: HttpClient) { }

  getSkill(id: number): Observable<Skill> {
    return this.http.get<Skill>(`${this.baseUrl}/${id}`);
  }

  createSkill(skill: Skill): Observable<Skill> {
    return this.http.post<Skill>(`${this.baseUrl}`, skill);
  }

  getSkillList(): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.baseUrl}`);
  }
}