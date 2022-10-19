import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AllarticleService } from '../service/allarticle.service';
import { ToparticleService } from '../service/toparticle.service';

@Component({
  selector: 'app-toparticles',
  templateUrl: './toparticles.component.html',
  styleUrls: ['./toparticles.component.css']
})
export class ToparticlesComponent implements OnInit {
  resultData: any = [];
  AllArticles: any = [];
  search = '';
  sort : any;
  page = 1;
  date: any;
  title: any;
  author: any;
  noresult: boolean = false;
  loading: boolean = false;


  constructor(
    private topArticleService:ToparticleService,
    private AllArticlesServices: AllarticleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}


  ngOnInit(): void {

    this.AllArticlesServices.type = "top";
   // get title,date,author and sort value from the url
   this.route.queryParams.subscribe((params: Params) => {
    this.title = params['title'];
    this.date = params['date'];
    this.author = params['author'];
    this.sort = params['sort'];
    // this.AllArticlesServices.updatePage(this.page);
  });

  this.route.params.subscribe((params: Params) => {
    this.page = +params['page'];
    console.log(this.page);
     this.topArticleService.updatePage(this.page);
  });

    this.title == undefined ? '' : this.title;
    this.author == undefined ? '' : this.author;
    this.sort == undefined ? '' : this.sort;
    this.date == undefined ? '' : this.date;

    // get the data from the service
    this.topArticleService.getAllArticle().subscribe((result) => {
      this.resultData = result;
      this.AllArticles = this.resultData.articles;
      if (this.title) {
        const regex = new RegExp(`${this.title}`, 'gi');
        this.AllArticles = this.AllArticles.filter((item: any) => {
          return item.title?.match(regex);
        });
      }
      if (this.date) {
        const regex = new RegExp(`${this.date}`, 'gi');
        this.AllArticles = this.AllArticles.filter((item: any) => {
          return item.publishedAt?.match(regex);
        });
      }
      if (this.author) {
        const regex = new RegExp(`${this.author}`, 'gi');
        this.AllArticles = this.AllArticles.filter((item: any) => {
          return item.author?.match(regex);
        });
      }
      // check if the sort value is not empty
      if (this.sort=="asc"){
        console.log(this.AllArticles);
        this.AllArticles.sort((a:any,b:any)=>{
          return a.publishedAt.localeCompare(b.publishedAt);
        });
        console.log(this.AllArticles);
        this.topArticleService.updateArticle(this.AllArticles);
      }
      else if (this.sort=="desc"){
        this.AllArticles = this.AllArticles.sort((a:any,b:any)=>{
          return b.publishedAt.localeCompare(a.publishedAt);
        });
        this.topArticleService.updateArticle(this.AllArticles);
      }
      else{
        this.topArticleService.updateArticle(this.AllArticles);
      }
      // update the article in the service
      this.topArticleService.updateArticle(this.AllArticles);
      this.loading = true;
    });

  }

  onSubmit() {
    this.loading = false;
    this.page = 1;
    this.title == undefined ? '' : this.title;
    this.author == undefined ? '' : this.author;
    this.sort == undefined ? '' : this.sort;
    this.date == undefined ? '' : this.date;

    //toparticles

   this.router.navigate(['toparticles', this.page, 0], {
      queryParams: {
        title: this.title,
        author: this.author,
        sort: this.sort,
        date: this.date,
      },
    });

    this.topArticleService.getAllArticle().subscribe((result) => {
      this.resultData = result;
      this.AllArticles = this.resultData.articles;

      if (this.title) {
        const regex = new RegExp(`${this.title}`, 'gi');
        this.AllArticles = this.AllArticles.filter((item: any) => {
          return item.title?.match(regex);
        });
      }
      if (this.date) {
        const regex = new RegExp(`${this.date}`, 'gi');
        this.AllArticles = this.AllArticles.filter((item: any) => {
          return item.publishedAt?.match(regex);
        });
      }
      if (this.author) {
        const regex = new RegExp(`${this.author}`, 'gi');
        this.AllArticles = this.AllArticles.filter((item: any) => {
          return item.author?.match(regex);
        });
      }

      this.topArticleService.updateArticle(this.AllArticles);

      if (this.AllArticles.length == 0) {
        this.noresult = true;
        this.AllArticlesServices.noresult = true;
      }else{
        this.noresult = false;
        this.AllArticlesServices.noresult = false;
      }
      this.loading = true;
    });
  }

  reset(){
    this.title = undefined;
    this.author = undefined;
    this.date = undefined;
    this.sort =   undefined;
    this.onSubmit();
  }

  //toparticles
  onSortasc(){
    this.page = 1;
    this.sort = "asc";
    this.router.navigate(['toparticles', this.page, 0], {
      queryParams: {
        title: this.title,
        author: this.author,
        sort: this.sort,
        date: this.date,
      },
    });

    this.AllArticles = this.AllArticles.sort((a:any,b:any)=>{
      return a.publishedAt.localeCompare(b.publishedAt);
    });
    this.topArticleService.updateArticle(this.AllArticles);
    console.log(this.page);
  }

  onSortDesc(){
    this.page = 1;
    this.sort = "desc";
    this.router.navigate(['toparticles', this.page, 0], {
      queryParams: {
        title: this.title,
        author: this.author,
        sort: this.sort,
        date: this.date,
      },
    });
    this.AllArticles = this.AllArticles.sort((a:any,b:any)=>{
      return b.publishedAt.localeCompare(a.publishedAt);
    });
    this.topArticleService.updateArticle(this.AllArticles);
  }

}
