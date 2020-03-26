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
  skillsData: Array<{}>
  page = 1;
  pageSize = 4;
  collectionSize = null

  constructor(private skillService: SkillService) {  }

  ngOnInit() {
    this.getSkills()
  }

  getSkills(): void {
    this.skillService.getSkillList()
      .subscribe((skills) => {
        this.collectionSize = skills.length
        this.skillsData = skills
      })
  }

  get listSkills() {
    if(this.skillsData) {
    return this.skillsData.map((skill, i) => ({id: i + 1, ...skill}))
    .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    }
  }


}
