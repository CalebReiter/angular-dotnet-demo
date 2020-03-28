import { Component, OnInit, Inject } from '@angular/core';
import { ResourceService, View, Resource } from 'src/app/services/resource.service';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'resource-get-component',
  templateUrl: './resource-get.component.html',
  styleUrls: ['./resource-get.component.css'],
})
export class ResourceGetComponent implements OnInit {

  resource: View<Resource> = {
    page: 0,
    pages: 0,
    top: 5,
    items: []
  };
  pages: number[] = [];

  constructor(private resourceService: ResourceService,
    private route: ActivatedRoute, @Inject(DOCUMENT) private _document: Document) { }

  ngOnInit() {
    this.route.queryParams.subscribe(x => {
      this.loadPage(x.page || 1, x.q || '')
      this.resource.page = x.page || 1
    });
  }

  loadPage(page: number, q: string) {
    this.resourceService.loadPage(this.resource.top, page, q)
      .subscribe(resource => {
        this.resource = resource;
        this.pages = new Array(resource.pages).fill(0).map((_, i) => i + 1);
      })
  }

  deleteResource(id: number) {
    this.resourceService.deleteResource(id)
      .subscribe(
        error => console.log(error));
    return this._document.defaultView.location.reload()
  }
}