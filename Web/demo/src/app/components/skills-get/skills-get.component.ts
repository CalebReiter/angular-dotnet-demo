import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { SkillService } from 'src/app/services/skill.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


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
  providers: [DecimalPipe]
})
export class SkillsGetComponent implements OnInit {
  skills: View<Skill> = {
    page: 0,
    pages: 0,
    top: 20,
    items: []
  };
  pages: number[] = [];
  // page = 1;
  // pageSize = 4;
  // collectionSize = null
  // console = console;

  constructor(private skillService: SkillService, private http: HttpClient,
    private route: ActivatedRoute) {  }

  ngOnInit() {
    this.route.queryParams.subscribe(x => {
      this.loadPage(x.page || 1, x.q || '')
      this.skills.page = x.page || 1
    });
  }

  private loadPage(page: number, q: string) {
    // get page of items from api
    this.http.get<View<Skill>>(`http://localhost:5000/api/Skills?top=${this.skills.top}&page=${page-1}&q=${q}`).subscribe(skills => {
        this.skills = skills;
        this.pages = new Array(skills.pages).fill(0).map((_,i) => i+1);
    });
}

  // getSkills(): void {
  //   this.skillService.getSkillList()
  //     .subscribe((skills) => {
  //       // this.collectionSize = skills.length
  //       this.skills = skills
  //     })
  // }

  // get listSkills() {
  //   if(this.skills) {
  //   return this.skills.map((skill, i) => ({id: i + 1, ...skill}))
  //   .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  //   }
  // }


}
