import { Component, OnInit } from '@angular/core';
import { SkillService } from 'src/app/services/skill.service';


@Component({
  selector: 'app-skills-get',
  templateUrl: './skills-get.component.html',
  styleUrls: ['./skills-get.component.css']
})
export class SkillsGetComponent {
  skills: Array<{}>
  page = 1;
  pageSize = 4;
  collectionSize = null

  constructor(private skillService: SkillService) { }

  ngOnInit() {
    this.getSkills()
  }

  getSkills(): void {
    this.skillService.getSkillList()
      .subscribe((skills) => {
        this.collectionSize = skills.length
        this.skills = skills
      })
  }

  get listSkills() {
    return this.skills
      .map((skill, i) => ({id: i + 1, ...skill}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }


}
