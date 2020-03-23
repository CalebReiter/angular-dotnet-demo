import { ResourceService } from '../../services/resource.service';
import { Resource } from '../../Resource';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./create-resource.component.css']
})
export class ResourceAddComponent implements OnInit {

  resource: Resource = new Resource();
  submitted = false;

  constructor(private resourceService: ResourceService,
    private router: Router) { }

  ngOnInit() {
  }

  newResource(): void {
    this.submitted = false;
    this.resource = new Resource();
  }

  save() {
    this.resourceService.createResource(this.resource)
      .subscribe(data => console.log(data), error => console.log(error));
    this.resource = new Resource();
    this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  gotoList() {
    this.router.navigate(['/resources']);
  }
}