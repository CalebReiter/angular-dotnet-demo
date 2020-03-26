import { Component, OnInit, Inject } from '@angular/core';
import { SkillService } from 'src/app/services/skill.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';


interface View<T> {
  pages: number,
  page: number,
  top: number,
  items: T[]
}

interface Skill {
  Id?: number
  SkillName: string
}

@Component({
  selector: 'skills-get-component',
  templateUrl: './skills-get.component.html',
  styleUrls: ['./skills-get.component.css'],
})
export class SkillsGetComponent implements OnInit {
  skills: View<Skill> = {
    page: 0,
    pages: 0,
    top: 5,
    items: []
  };
  pages: number[] = [];

  constructor(private skillService: SkillService, private http: HttpClient,
    private route: ActivatedRoute, @Inject(DOCUMENT) private _document: Document) { }

  ngOnInit() {
    this.route.queryParams.subscribe(x => {
      this.loadPage(x.page || 1, x.q || '')
      this.skills.page = x.page || 1
    });
  }


  private loadPage(page: number, q: string) {
    this.http.get<View<Skill>>(`http://localhost:5000/api/Skills?top=${this.skills.top}&page=${page - 1}&q=${q}`).subscribe(skills => {
      this.skills = skills;
      this.pages = new Array(skills.pages).fill(0).map((_, i) => i + 1);
    });
  }

  deleteSkill(id: number) {
    this.skillService.deleteSkill(id)
      .subscribe(
        error => console.log(error));
    return this._document.defaultView.location.reload()
  }

}
