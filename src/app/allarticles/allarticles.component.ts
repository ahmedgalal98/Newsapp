import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AllarticleService } from '../service/allarticle.service';

@Component({
  selector: 'app-allarticles',
  templateUrl: './allarticles.component.html',
  styleUrls: ['./allarticles.component.css'],
})
export class AllarticlesComponent implements OnInit {
  resultData: any = [];
  AllArticles: any = [];

  search = '';
  sort = '';
  page = 1;

  constructor(
    private AllArticlesServices: AllarticleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.search = params['search'];
      this.sort = params['sort'];
      this.page = +params['page'];
      this.AllArticlesServices.updatePage(this.page);
      console.log(this.search);
    });

    this.AllArticlesServices.getAllArticle().subscribe((result) => {
      this.resultData = result;
      if (this.search == 'a') {
        this.AllArticles = this.resultData.articles;
        this.search = '';
        // this.AllArticlesServices.Articles = this.AllArticles;
      } else {
        const regex = new RegExp(`${this.search}`, 'gi');
        this.AllArticles = this.resultData.articles.filter(
          (item: any) => {
            return item.title.match(regex) || item.author.match(regex) || item.publishedAt.match(regex);
          }
        );
      }
      if (this.sort=="asc"){
        console.log(this.AllArticles);
        this.AllArticles.sort((a:any,b:any)=>{
          return a.publishedAt.localeCompare(b.publishedAt);
        });
        console.log(this.AllArticles);
        this.AllArticlesServices.updateArticle(this.AllArticles);
      }
      else if (this.sort=="desc"){
        this.AllArticles = this.AllArticles.sort((a:any,b:any)=>{
          return b.publishedAt.localeCompare(a.publishedAt);
        });
        this.AllArticlesServices.updateArticle(this.AllArticles);
      }
      else{
        this.AllArticlesServices.updateArticle(this.AllArticles);
      }
      this.AllArticlesServices.updateArticle(this.AllArticles);
    });

    // console.log(this.AllArticlesServices.Articles);
  }

  onSubmit() {

    this.page = 1;
    if(this.search == ''){
    this.router.navigate(['allarticles', "a", 'nosort',this.page, '0']);
    }else{
      this.router.navigate(['allarticles', this.search, 'nosort',this.page, '0']);
    }

    this.AllArticlesServices.getAllArticle().subscribe((result) => {
      this.resultData = result;
      if (this.search == '') {
        this.AllArticles = this.resultData.articles;
        console.log(this.AllArticles);
        // this.AllArticlesServices.Articles = this.AllArticles;
      } else {
        const regex = new RegExp(`${this.search}`, 'gi');
        this.AllArticles = this.resultData.articles.filter(
          (item: any) => {
            return item.title.match(regex) || item.author.match(regex) || item.publishedAt.match(regex);
          }
        );
      }

      this.AllArticlesServices.updateArticle(this.AllArticles);
      console.log(this.AllArticles);
    });
  }

  onSortasc(){
    this.sort = "asc";
    this.search= this.route.snapshot.params['search'];
    this.router.navigate(['allarticles', this.search, this.sort,this.page, '0']);
    this.AllArticles = this.AllArticles.sort((a:any,b:any)=>{
      return a.publishedAt.localeCompare(b.publishedAt);
    });
    this.AllArticlesServices.updateArticle(this.AllArticles);
    console.log(this.page);
  }

  onSortDesc(){
    this.sort = "desc";
    this.search= this.route.snapshot.params['search'];
    this.router.navigate(['allarticles', this.search, this.sort,this.page, '0']);
    this.AllArticles = this.AllArticles.sort((a:any,b:any)=>{
      return b.publishedAt.localeCompare(a.publishedAt);
    });
    this.AllArticlesServices.updateArticle(this.AllArticles);
  }

}
