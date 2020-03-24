import { Component, OnInit } from '@angular/core';
import {ResourceService } from 'src/app/services/resource.service';

@Component({
  selector: 'app-skills-get',
  templateUrl: './resource-get.component.html',
  styleUrls: ['./resource-get.component.css']
})
export class ResourceGetComponent implements OnInit {
  resources: string = '';
  constructor(private resourceService: ResourceService) { }

  ngOnInit() {
    this.getResources()
  }

  getResources(): void {
    this.resourceService.getResourceList()
      .subscribe((resources) => {
        this.resources = JSON.stringify(resources, null, 2);
      })
  }



}