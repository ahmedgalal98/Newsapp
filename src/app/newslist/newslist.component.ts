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
  @Input() search:any = ''
  @Input() sort:any = ''
  // @Input() page:number = 0;
  page:number = 1;

  totalLength:any;



  constructor(
    private AllArticlesServices: AllarticleService,
    private TopArticlesServices: ToparticleService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if(this.AllArticlesServices.type == 'top'){
      this.page = this.TopArticlesServices.page;
    }else{
    this.page = this.AllArticlesServices.page;}
    this.totalLength = this.allarticles.length;
    // console.log(this.page);
    console.log(this.allarticles)
  }

pageChanged(event:any){
  if(this.AllArticlesServices.type == 'top'){
    this.TopArticlesServices.updatePage(event);
  this.page = event;
  this.router.navigate(['toparticles', this.search, this.sort,this.page, (this.page-1)*10]);
    // if (this.search == '') {
    //   this.router.navigate(['toparticles',":search",this.sort,this.page]);
    // }
  }
  else{
  this.AllArticlesServices.updatePage(event);
    this.search= this.route.snapshot.params['search'];
  this.page = event;
   this.router.navigate(['allarticles', this.search, this.sort,this.page, (this.page-1)*10]);
  }
}

}
