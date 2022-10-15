import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavebarComponent } from './navebar/navebar.component';

import { HttpClientModule } from '@angular/common/http';

import { AllarticleService } from './service/allarticle.service';
import { AllarticlesComponent } from './allarticles/allarticles.component';
import { NewslistComponent } from './newslist/newslist.component';
import { NewsdetailsComponent } from './newsdetails/newsdetails.component';
import { NewsitemComponent } from './newsitem/newsitem.component';
import { FormsModule } from '@angular/forms';

import {NgxPaginationModule} from 'ngx-pagination';
import { ToparticlesComponent } from './toparticles/toparticles.component';

@NgModule({
  declarations: [
    AppComponent,
    NavebarComponent,
    AllarticlesComponent,
    NewslistComponent,
    NewsdetailsComponent,
    NewsitemComponent,
    ToparticlesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [AllarticleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
