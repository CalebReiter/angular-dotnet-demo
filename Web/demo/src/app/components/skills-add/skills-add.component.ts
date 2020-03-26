import { Component, OnInit } from '@angular/core';
import { Skill, SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-skills-add',
  templateUrl: './skills-add.component.html',
  styleUrls: ['./skills-add.component.css']
})
export class SkillsAddComponent implements OnInit {

  skill: Skill = {
    SkillName: ''
  }
  loading: boolean
  submitted: boolean
  submitError: boolean

  constructor(private skillService: SkillService) { }

  ngOnInit() {}

  createSkill(): void {
    this.loading = true;
    if(this.skill.SkillName != '') {
    this.skillService.createSkill(this.skill)
      .subscribe(() => {
        this.loading = false;
        this.submitted = true;
        this.submitError = false;
        this.skill.SkillName = ''
      })
    } else {
        this.loading = false;
        this.submitError = true;
        this.submitted = false;
      }
    }
}
