import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AllarticleService {
  Articles: any;
  page = 1;
  type = "all";




  constructor(private http:HttpClient) { }

  allApiUrl ="https://newsapi.org/v2/everything?q=a&apiKey=f51e9a18a4944813a9f1da24e436a6c8"

  getAllArticle(){
    return this.http.get(this.allApiUrl)
  }

  updateArticle(articles: any){
    this.Articles = articles;

  }
  updatePage(page: number){
    this.page = page;
  }

}
