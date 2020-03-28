import { ResourceService, Resource } from '../../services/resource.service';
import { Component, OnInit, Inject } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { SkillService } from 'src/app/services/skill.service';
import { DOCUMENT } from '@angular/common';
import { timer } from 'rxjs';


@Component({
  selector: 'resource-add-component',
  templateUrl: './resource-add.component.html',
  styleUrls: ['./resource-add.component.css']
})
export class ResourceAddComponent implements OnInit {

  dropdownSettings:IDropdownSettings;

  resource: Resource = {
    name: '',
    skills: ''
  }

  skills = []
  selectedItems = [];  
  loading: boolean
  submitted: boolean
  submitError: boolean
  console = console

  constructor(private resourceService: ResourceService, private skillService: SkillService, 
    @Inject(DOCUMENT) private _document: Document) { }

  getSkills(): void {
    this.skillService.getSkillList()
      .subscribe(skills=>{
        this.skills=skills;
      })
  }


  ngOnInit() {
    this.getSkills()
    if(this.skills)
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'skillName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 20,
      allowSearchFilter: true
    };
  }

  onItemSelect(item: any) {
    this.selectedItems.push(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  
  createResource(): void {
    this.loading = true;
    this.resource.skills = this.selectedItems.toString()
    if(this.resource.name != '') {
    this.resourceService.createResource(this.resource)
      .subscribe(() => {
        this.loading = false;
        this.submitted = true;
        this.submitError = false;
        timer(400).subscribe(x => { this._document.defaultView.location.reload() })
      })
    } else {
        this.loading = false;
        this.submitError = true;
        this.submitted = false;
      }
    }
}