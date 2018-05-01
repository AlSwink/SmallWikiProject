import { Component, OnInit } from '@angular/core';
import { Article } from '../article';
import { ArticleService } from '../article.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    articles: Article[] = [];
  constructor(private articleService: ArticleService) { }

  ngOnInit() {
      this.getArticles();
  }
    
  getArticles(): void {
      this.articleService.getArticles().subscribe(articles => this.articles = articles);
      }

}
