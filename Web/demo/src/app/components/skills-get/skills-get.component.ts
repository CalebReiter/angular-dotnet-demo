import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'skills-get-component',
  templateUrl: './skills-get.component.html',
  styleUrls: ['./skills-get.component.css'],
  providers: [DecimalPipe]
})
export class SkillsGetComponent implements OnInit {
  skills: Array<{}>
  page = 1;
  pageSize = 4;
  collectionSize = null
  console = console;

  constructor(private skillService: SkillService) {  }

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
    if(this.skills) {
    return this.skills.items.map((skill, i) => ({id: i + 1, ...skill}))
    .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    }
  }


}
