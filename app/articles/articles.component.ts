import { Component, OnInit } from '@angular/core';
import { Article } from '../article';
import { Location } from '@angular/common';
import { ARTICLES } from '../mock-articles';
import { ArticleService } from '../article.service';

@Component({
    selector: 'app-articles',
    templateUrl: './articles.component.html',
    styleUrls: []
})

export class ArticlesComponent implements OnInit{
      
    newArticle: Article;
    articles : Article[];
    addFlag = false;
    constructor(private articleService: ArticleService,private location: Location) {}
    
    ngOnInit(){
        this.getArticles();
        }
    
   
    
    getArticles(): void {
        this.articleService.getArticles().subscribe(articles => this.articles = articles);
    }
    
    add(): void {
       this.addFlag= true;
    }
    
    save(): void{
      this.addFlag = false;
      this.articleService.addArticle(this.newArticle).subscribe(() => this.goBack());
      }
     goBack(): void {
      this.location.back();
  }
}