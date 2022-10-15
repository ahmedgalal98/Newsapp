import { Component, OnInit,Input } from '@angular/core';
import { AllarticleService } from '../service/allarticle.service';
import {ToparticleService} from '../service/toparticle.service';
@Component({
  selector: 'app-newsitem',
  templateUrl: './newsitem.component.html',
  styleUrls: ['./newsitem.component.css']
})
export class NewsitemComponent implements OnInit {
  @Input() article:any = {}
  @Input() index:any = 0
  page:any;
   constructor(
    private AllArticlesServices: AllarticleService,
    private TopArticlesServices: ToparticleService,
  ) { }


  ngOnInit(): void {
    if (this.AllArticlesServices.type== 'top') {
      this.page = this.TopArticlesServices.page;
    }else{
    this.page = this.AllArticlesServices.page;
    }
  }

}
