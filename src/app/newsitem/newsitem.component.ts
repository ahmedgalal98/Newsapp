import { Component, OnInit,Input } from '@angular/core';
import { AllarticleService } from '../service/allarticle.service';
import {ToparticleService} from '../service/toparticle.service';
import { Article } from '../Article';
@Component({
  selector: 'app-newsitem',
  templateUrl: './newsitem.component.html',
  styleUrls: ['./newsitem.component.css']
})
export class NewsitemComponent implements OnInit {
  @Input() article:Article = {}
  @Input() index:any = 0
  @Input() page:any = 1;
  @Input() author:any = '';
  @Input() title = '';
  @Input() sort = ''
  @Input() date =''

   constructor(
    private AllArticlesServices: AllarticleService,
    private TopArticlesServices: ToparticleService,
  ) { }


  ngOnInit(): void {
    // if (this.AllArticlesServices.type== 'top') {
    //   this.page = this.TopArticlesServices.page;
    // }else{
    // this.page = this.AllArticlesServices.page;
    // }
    // console.log(this.page);
    console.log(this.article);
  }

}
