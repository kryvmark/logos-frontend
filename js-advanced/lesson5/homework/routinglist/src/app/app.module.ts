import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { WorksComponent } from './works/works.component';
import { CensorComponent } from './works/censor/censor.component';
import { UserListComponent } from './works/userlist/userlist.component';
import { TaskListComponent } from './works/tasklist/tasklist.component';
import { FormsModule } from '@angular/forms';
import { TaskTableComponent } from './works/tasklist/task-table/task-table.component';

@NgModule({
  declarations: [
    AppComponent,
    CensorComponent,
    UserListComponent,
    TaskListComponent,
    HomeComponent,
    WorksComponent,
    TaskTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
