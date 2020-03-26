import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResourceAddComponent } from './components/resource-add/resource-add.component';
import { ResourceGetComponent } from './components/resource-get/resource-get.component';
import { ResourceEditComponent } from './components/resource-edit/resource-edit.component';
import { SkillsAddComponent } from './components/skills-add/skills-add.component';
import { SkillsUpdateComponent } from './components/skills-update/skills-update.component';
import { SkillsGetComponent } from './components/skills-get/skills-get.component';
import { ResourceService } from './services/resource.service';
import { SkillService } from './services/skill.service';


@NgModule({
  declarations: [
    AppComponent,
    ResourceAddComponent,
    ResourceGetComponent,
    ResourceEditComponent,
    SkillsAddComponent,
    SkillsGetComponent,
    SkillsUpdateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [ResourceService, SkillService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
