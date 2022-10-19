import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ToparticleService {
  Articles: any;
  page = 1;
  noarticle: any;




  constructor(private http:HttpClient) { }

  topApiUrl ="https://newsapi.org/v2/top-headlines?q=a&apiKey=f51e9a18a4944813a9f1da24e436a6c8"

  getAllArticle(){
    return this.http.get(this.topApiUrl)
  }

  updateArticle(articles: any){
    this.Articles = articles;

  }
  updatePage(page: number){
    this.page = page;
  }

  updateNoarticle(noarticle: any){
    this.noarticle = noarticle;
  }

}
