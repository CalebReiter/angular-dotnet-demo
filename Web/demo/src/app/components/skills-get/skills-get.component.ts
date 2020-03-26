import { Component, OnInit, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SkillService } from 'src/app/services/skill.service';

interface Skill {
  id?: number,
  SkillName: string;
}

@Component({
  selector: 'app-skills-get',
  templateUrl: './skills-get.component.html',
  styleUrls: ['./skills-get.component.css'],
  providers: [DecimalPipe]
})
export class SkillsGetComponent implements OnInit {
  skills: Array<{id?: number, SkillName: string}>
  page = 1;
  pageSize = 4;
  collectionSize = null

  filter = new FormControl('');

  constructor(private skillService: SkillService, pipe: DecimalPipe) { 
    if(this.skills) {
    this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text, pipe))
    );
    }
  }

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

  search(text: string, pipe: PipeTransform) {
    if(this.skills) {
    return this.skills.filter(skill => {
      const term = text.toLowerCase();
      return skill.id
          || pipe.transform(skill.SkillName).includes(term)
    });
  }
  }

  get listSkills() {
    if(this.skills) {
    return this.skills.map((skill, i) => ({id: i + 1, ...skill}))
    .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    }
  }


}
