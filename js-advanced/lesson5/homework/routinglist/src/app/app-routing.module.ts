import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WorksComponent } from './works/works.component';
import { CensorComponent } from './works/censor/censor.component';
import { UserListComponent } from './works/userlist/userlist.component';
import { TaskListComponent } from './works/tasklist/tasklist.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  {
    path: 'works', component: WorksComponent, children: [
      { path: 'censor', component: CensorComponent },
      { path: 'userlist', component: UserListComponent },
      { path: 'tasklist', component: TaskListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
