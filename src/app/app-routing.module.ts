import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllarticlesComponent } from './allarticles/allarticles.component';
import { NewsdetailsComponent } from './newsdetails/newsdetails.component';
import { ToparticlesComponent } from './toparticles/toparticles.component';

const routes: Routes = [
  {path: '', redirectTo: 'allarticles/a/nosort/1', pathMatch: 'full'},
  {
    path: 'allarticles/:search/:sort/:page', component: AllarticlesComponent,
    children: [
      {path: '',  redirectTo: '0', pathMatch: 'full'},
      {path: ':id', component: NewsdetailsComponent}
    ]
  },
  {
    path:'toparticles/:search/:sort/:page', component: ToparticlesComponent,
    children: [
      {path: '',  redirectTo: '0', pathMatch: 'full'},
      {path: ':id', component: NewsdetailsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
