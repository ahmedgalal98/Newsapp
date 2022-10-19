import { Component, OnInit } from '@angular/core';
import { AllarticleService } from '../service/allarticle.service';
import { ToparticleService } from '../service/toparticle.service';
@Component({
  selector: 'app-navebar',
  templateUrl: './navebar.component.html',
  styleUrls: ['./navebar.component.css']
})
export class NavebarComponent implements OnInit {

  allArticalldata :any=[];


  constructor(
    private AllArticlesServices: AllarticleService,
    private topArticleService:ToparticleService,
  ) { }



  ngOnInit(): void {
    // this.AllArticlesServices.getAllArticle().subscribe((data)=>{
    //   this.allArticalldata = data;
    // }
    //)
  }

  allArticles(){
    this.AllArticlesServices.type = 'all';
    this.AllArticlesServices.updatePage(1);
    this.AllArticlesServices.updateArticle(this.allArticalldata.articles);
  }

  topArticles(){
    this.AllArticlesServices.type = 'top';
    this.AllArticlesServices.updatePage(1);
    this.AllArticlesServices.updateArticle(this.topArticleService.Articles);

  }


}
