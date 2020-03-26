import { Component, OnInit } from '@angular/core';
import { Skill, SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-skills-update',
  templateUrl: './skills-update.component.html',
  styleUrls: ['./skills-update.component.css']
})
export class SkillsUpdateComponent implements OnInit {

  skill: Skill = {
    id: null,
    SkillName: ''
  }
  loading: boolean
  submitted: boolean
  submitError: boolean

  constructor(private skillService: SkillService) { }

  ngOnInit() {}

  updateSkill(): void {
    this.loading = true;
    if(this.skill.SkillName != '') {
      console.log(this.skill.SkillName)
      console.log(this.skill.id)
    this.skillService.updateSkill(this.skill.id, this.skill.SkillName)
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
