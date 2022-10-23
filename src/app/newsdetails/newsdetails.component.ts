import { Component, OnInit,DoCheck, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AllarticleService } from '../service/allarticle.service';
import {ToparticleService } from '../service/toparticle.service';

@Component({
  selector: 'app-newsdetails',
  templateUrl: './newsdetails.component.html',
  styleUrls: ['./newsdetails.component.css'],
})
export class NewsdetailsComponent implements  AfterViewInit {



  resultData:any
  article:any= {}
  id = 0;




  constructor(
    private AllArticlesServices: AllarticleService,
    private TopArticlesServices: ToparticleService,
    private route: ActivatedRoute
  ) {}

  // ngOnInit(): void {
  //   this.route.params
  //   .subscribe(
  //     (params: Params) => {
  //       this.id = +params['id'];
  //       if(this.AllArticlesServices.type == 'top'){
  //       this.article = this.TopArticlesServices.Articles[this.id];
  //       }else{
  //       this.article = this.AllArticlesServices.Articles[this.id];
  //       }
  //       console.log(this.article);
  //     }
  //     );
  // }
  ngAfterViewInit(): void {

    // delay the execution of the code waiting for the data to be loaded

     this.route.params
     .subscribe(
       (params: Params) => {
         this.id = +params['id'];
         if(this.AllArticlesServices.type == 'top'){
           this.article = this.TopArticlesServices.Articles[this.id];
         }else{
         this.article = this.AllArticlesServices.Articles[this.id];
         }

       }
       );
      }



}
