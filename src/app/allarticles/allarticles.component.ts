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
  noresult: boolean = false;


  constructor(
    private AllArticlesServices: AllarticleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}


  ngOnInit(): void {

    // get the search and sort value from the url
    this.route.params.subscribe((params: Params) => {
      this.search = params['search'];
      this.sort = params['sort'];
      this.page = +params['page'];
      this.AllArticlesServices.updatePage(this.page);
    });

    // get the data from the service
    this.AllArticlesServices.getAllArticle().subscribe((result) => {
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
      // update the article in the service
      this.AllArticlesServices.updateArticle(this.AllArticles);
    });

  }

  // onSearch function to search the article

  onSubmit() {

    this.page = 1;

    // navicate to the url with the search and sort value
    if(this.search == ''){
    this.router.navigate(['allarticles', "a", 'nosort',this.page, '0']);
    }else{
      this.router.navigate(['allarticles', this.search, 'nosort',this.page, '0']);
    }

    // get the data from the service
    this.AllArticlesServices.getAllArticle().subscribe((result) => {
      this.resultData = result;
      if (this.search == '') {
        this.AllArticles = this.resultData.articles;
      } else {
        const regex = new RegExp(`${this.search}`, 'gi');
        this.AllArticles = this.resultData.articles.filter(
          (item: any) => {
            return item.title.match(regex) || item.author.match(regex) || item.publishedAt.match(regex);
          }
        );
      }
      if (this.AllArticles.length == 0) {
        this.noresult = true;
        this.AllArticlesServices.noresult = true;
      }else{
        this.noresult = false;
        this.AllArticlesServices.noresult = false;
      }
      this.AllArticlesServices.updateArticle(this.AllArticles);
    });
  }

  onSortasc(){
    this.sort = "asc";
    this.search= this.route.snapshot.params['search'];
    this.router.navigate(['allarticles', this.search, this.sort,this.page, '0']);
    this.search = '';
    this.AllArticles = this.AllArticles.sort((a:any,b:any)=>{
      return a.publishedAt.localeCompare(b.publishedAt);
    });
    this.AllArticlesServices.updateArticle(this.AllArticles);
  }

  onSortDesc(){
    this.sort = "desc";
    this.search= this.route.snapshot.params['search'];
    this.router.navigate(['allarticles', this.search, this.sort,this.page, '0']);
    this.search = '';
    this.AllArticles = this.AllArticles.sort((a:any,b:any)=>{
      return b.publishedAt.localeCompare(a.publishedAt);
    });
    this.AllArticlesServices.updateArticle(this.AllArticles);
  }

}
