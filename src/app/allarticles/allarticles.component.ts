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
  sort : any;
  page = 1;
  date: any;
  title: any;
  author: any;
  noresult: boolean = false;
  loading: boolean = false;

  constructor(
    private AllArticlesServices: AllarticleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
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
      this.AllArticlesServices.updatePage(this.page);
    });

    this.title == undefined ? '' : this.title;
    this.author == undefined ? '' : this.author;
    this.sort == undefined ? '' : this.sort;
    this.date == undefined ? '' : this.date;

    // get the data from the service
    this.AllArticlesServices.getAllArticle().subscribe((result) => {
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
      if (this.sort == 'asc') {
        console.log(this.AllArticles);
        this.AllArticles.sort((a: any, b: any) => {
          return a.publishedAt.localeCompare(b.publishedAt);
        });
        console.log(this.AllArticles);
        this.AllArticlesServices.updateArticle(this.AllArticles);
      }
      else if (this.sort == 'desc') {
        this.AllArticles = this.AllArticles.sort((a: any, b: any) => {
          return b.publishedAt.localeCompare(a.publishedAt);
        });
        this.AllArticlesServices.updateArticle(this.AllArticles);
      } else {
        this.AllArticlesServices.updateArticle(this.AllArticles);
      }
      // update the article in the service
      this.AllArticlesServices.updateArticle(this.AllArticles);
      this.loading = true;
    });
  }

  // onSearch function to search the article

  onSubmit() {
    this.loading = false;
    this.page = 1;
    this.title == undefined ? '' : this.title;
    this.author == undefined ? '' : this.author;
    this.sort == undefined ? '' : this.sort;
    this.date == undefined ? '' : this.date;

    // navicate to the url with the search and sort value
    // if(this.search == ''){
    // this.router.navigate(['allarticles', "a", 'nosort',this.page, '0']);
    // }else{
    //   this.router.navigate(['allarticles', this.search, 'nosort',this.page, '0']);
    // }

    this.router.navigate(['allarticles', this.page, 0], {
      queryParams: {
        title: this.title,
        author: this.author,
        sort: this.sort,
        date: this.date,
      },
    });

    // get the data from the service
    this.AllArticlesServices.getAllArticle().subscribe((result) => {
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

      // const regex = new RegExp(`${this.search}`, 'gi');
      // this.AllArticles = this.resultData.articles.filter(
      //   (item: any) => {
      //     return item.title.match(regex) || item.author.match(regex) || item.publishedAt.match(regex);
      //   }
      // );
      this.AllArticlesServices.updateArticle(this.AllArticles);

      if (this.AllArticles.length == 0) {
        this.noresult = true;
        // this.AllArticlesServices.noresult = true;
      } else {
        this.noresult = false;
        // this.AllArticlesServices.noresult = false;
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

  onSortasc() {
    this.page = 1;
    this.sort = 'asc';
    this.router.navigate(['allarticles', this.page, 0], {
      queryParams: {
        title: this.title,
        author: this.author,
        sort: this.sort,
        date: this.date,
      },
    });
    // this.search = '';
    this.AllArticles = this.AllArticles.sort((a: any, b: any) => {
      return a.publishedAt.localeCompare(b.publishedAt);
    });
    this.AllArticlesServices.updateArticle(this.AllArticles);
  }

  onSortDesc() {
    this.page = 1;
    this.sort = 'desc';
    this.router.navigate(['allarticles', this.page, 0], {
      queryParams: {
        title: this.title,
        author: this.author,
        sort: this.sort,
        date: this.date,
      },
    });
    // this.search = '';
    this.AllArticles = this.AllArticles.sort((a: any, b: any) => {
      return b.publishedAt.localeCompare(a.publishedAt);
    });
    this.AllArticlesServices.updateArticle(this.AllArticles);
  }
}
