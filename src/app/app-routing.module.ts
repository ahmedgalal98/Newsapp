import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllarticlesComponent } from './allarticles/allarticles.component';
import { NewsdetailsComponent } from './newsdetails/newsdetails.component';
import { ToparticlesComponent } from './toparticles/toparticles.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path: '', redirectTo: 'allarticles', pathMatch: 'full'},
  {
    path: 'allarticles', component: AllarticlesComponent,
    children: [
      {path: '', redirectTo: '0', pathMatch: 'full'},
      {path: ':id', component: NewsdetailsComponent}
    ]
  },
  {
    path:'toparticles', component: ToparticlesComponent,
    children: [
      {path: '', redirectTo: '0', pathMatch: 'full'},
      {path: ':id', component: NewsdetailsComponent}
    ]
  },
  {
    path:"not-found", component: NotFoundComponent
  },
  {
    path:"**", redirectTo: "not-found"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
