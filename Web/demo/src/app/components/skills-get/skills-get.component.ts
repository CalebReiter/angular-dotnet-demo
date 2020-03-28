import { Component, OnInit, Inject } from '@angular/core';
import { SkillService, View, Skill } from 'src/app/services/skill.service';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';

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

  constructor(private skillService: SkillService,
    private route: ActivatedRoute, @Inject(DOCUMENT) private _document: Document) { }

  ngOnInit() {
    this.route.queryParams.subscribe(x => {
      this.loadPage(x.page || 1, x.q || '')
      this.skills.page = x.page || 1
    });
  }

  loadPage(page: number, q: string) {
    this.skillService.loadPage(this.skills.top, page, q)
      .subscribe(skills => {
        this.skills = skills;
        this.pages = new Array(skills.pages).fill(0).map((_, i) => i + 1);
      })
  }

  deleteSkill(id: number) {
    this.skillService.deleteSkill(id)
      .subscribe(
        error => console.log(error));
    return this._document.defaultView.location.reload()
  }
}
