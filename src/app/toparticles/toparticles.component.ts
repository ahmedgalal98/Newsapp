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
  sort = '';
  page = 1;
  noresult = false;
  loading : boolean= false;


  constructor(
    private topArticleService:ToparticleService,
    private AllArticlesServices: AllarticleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}


  ngOnInit(): void {

    this.AllArticlesServices.type = "top";
    this.route.params.subscribe((params: Params) => {
      this.search = params['search'];
      this.sort = params['sort'];
      this.page = +params['page'];
      this.topArticleService.updatePage(this.page);
    });

    // get the data from the service
    this.topArticleService.getAllArticle().subscribe((result) => {
      this.resultData = result;
      // check if the search value is not empty
      if (this.search == 'a') {
        this.AllArticles = this.resultData.articles;
        this.search = '';
      } else {
        const regex = new RegExp(`${this.search}`, 'gi');
        this.AllArticles = this.resultData.articles.filter(
          (item: any) => {
            return item.title.match(regex) || item.author.match(regex) || item.publishedAt.match(regex);
          }
        );
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
    if(this.search == ''){
    this.router.navigate(['toparticles', "a", 'nosort',this.page, '0']);
    this.search= ''
    }else{
      this.router.navigate(['toparticles', this.search, 'nosort',this.page, '0']);
    }

    this.topArticleService.getAllArticle().subscribe((result) => {
      this.resultData = result;
      if (this.search == '') {
        this.AllArticles = this.resultData.articles;
        console.log(this.AllArticles);
        // this.AllArticlesServices.Articles = this.AllArticles;
      } else {
        const regex = new RegExp(`${this.search}`, 'gi');
        this.AllArticles = this.resultData.articles.filter(
          (item: any) => {
            return item.title.match(regex) || item.publishedAt.match(regex);
          }
        );
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

  onSortasc(){
    this.sort = "asc";
    this.search= this.route.snapshot.params['search'];
    this.router.navigate(['toparticles', this.search, this.sort,this.page, '0']);
    this.AllArticles = this.AllArticles.sort((a:any,b:any)=>{
      return a.publishedAt.localeCompare(b.publishedAt);
    });
    this.topArticleService.updateArticle(this.AllArticles);
    console.log(this.page);
  }

  onSortDesc(){
    this.sort = "desc";
    this.search= this.route.snapshot.params['search'];
    this.router.navigate(['toparticles', this.search, this.sort,this.page, '0']);
    this.AllArticles = this.AllArticles.sort((a:any,b:any)=>{
      return b.publishedAt.localeCompare(a.publishedAt);
    });
    this.topArticleService.updateArticle(this.AllArticles);
  }

}
