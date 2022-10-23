import { Component, OnInit,Input } from '@angular/core';
import { AllarticleService } from '../service/allarticle.service';
import {ToparticleService} from '../service/toparticle.service';

import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-newslist',
  templateUrl: './newslist.component.html',
  styleUrls: ['./newslist.component.css']
})
export class NewslistComponent implements OnInit {

  @Input() allarticles:any = []
  @Input() author:any = '';
  @Input() title = '';
  @Input() sort:any = ''
  @Input() date: any;
  @Input() page:any= 1 ;

  totalLength:any;



  constructor(
    private AllArticlesServices: AllarticleService,
    private TopArticlesServices: ToparticleService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    console.log(this.page)
  //   if(this.AllArticlesServices.type == 'top'){
  //     this.page = this.TopArticlesServices.page;
  //   }else{
  //   this.page = this.AllArticlesServices.page;
  // }
    this.totalLength = this.allarticles.length;
  }

pageChanged(event:any){

    this.page = event;
    this.title= this.route.snapshot.queryParams['title'];
    this.author= this.route.snapshot.queryParams['author'];
    this.sort= this.route.snapshot.queryParams['sort'];


    this.title= undefined?'':this.title;
    this.author= undefined?'':this.author;
    this.sort= undefined?'':this.sort;

  if(this.AllArticlesServices.type == 'top'){
    this.TopArticlesServices.updatePage(event);

    this.router.navigate(['toparticles',(this.page-1)*10], {
      queryParams: {
        title: this.title,
        author: this.author,
        sort: this.sort,
        date: this.date,
        page: this.page

      },
    });

    // this.router.navigate(['toparticles', this.search, this.sort,this.page, (this.page-1)*10]);
    // if (this.search == '') {
    //   this.router.navigate(['toparticles',":search",this.sort,this.page]);
    // }
  }
  else{
  this.AllArticlesServices.updatePage(event);
  //  this.router.navigate(['allarticles', this.search, this.sort,this.page, (this.page-1)*10]);

  this.router.navigate(['allarticles',(this.page-1)*10], {
    queryParams: {
      title: this.title,
      author: this.author,
      sort: this.sort,
      date : this.date,
      page: this.page
    },
  });
  }
}

}
