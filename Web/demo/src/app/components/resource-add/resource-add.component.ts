import { ResourceService } from '../../services/resource.service';
import { SkillService } from 'src/app/services/skill.service';
import { Resource } from '../../models/Resource';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';


@Component({
  selector: 'app-create-resource',
  templateUrl: './resource-add.component.html',
  styleUrls: ['./resource-add.component.css']
})
export class ResourceAddComponent implements OnInit {

  resource: Resource = new Resource();
  submitted = false;
  form: FormGroup;

  constructor(private resourceService: ResourceService, private skillService: SkillService,
    private router: Router, private fb: FormBuilder) { }

  newResource(): void {
    this.submitted = false;
    this.resource = new Resource();
  }
  skills: Array<{}>

  ngOnInit() {
    this.getSkills()
    this.form = this.fb.group({
      name: this.fb.array([])
    });
  }

  getSkills(): void {
    this.skillService.getSkillList()
      .subscribe(data=>{
        this.skills=data;
  
      } 
      )
  }


  onChange(name: string, isChecked: boolean) {
    const skills = (this.form.controls.name as FormArray);

    if (isChecked) {
      skills.push(new FormControl(name));
    } else {
      const index = skills.controls.findIndex(x => x.value === name);
      skills.removeAt(index);
    }
  }


  save() {
    this.resource.skills = this.form.value.name.toString()
    this.resourceService.createResource(this.resource)
      .subscribe(data => console.log(data), error => console.log(error));
    this.resource = new Resource();
    // this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value.name.toString());
    this.save();    
  }

  // gotoList() {
  //   this.router.navigate(['/resources']);
  // }
}