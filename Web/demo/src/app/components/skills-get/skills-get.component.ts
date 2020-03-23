import { Component, OnInit } from '@angular/core';
import { Skill, SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-skills-get',
  templateUrl: './skills-get.component.html',
  styleUrls: ['./skills-get.component.css']
})
export class SkillsGetComponent implements OnInit {
  skills: string = '';
  constructor(private skillService: SkillService) { }

  ngOnInit() {
    this.getSkills()
  }

  getSkills(): void {
    this.skillService.getSkillList()
      .subscribe((skills) => {
        this.skills = JSON.stringify(skills, null, 2);
      })
  }



}
