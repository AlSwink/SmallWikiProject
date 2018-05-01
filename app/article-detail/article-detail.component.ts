import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ArticleService } from '../article.service';
import { Article } from '../article';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {

   article: Article; 
    editFlag = false
    
  constructor( private route: ActivatedRoute,
  private articleService: ArticleService,
  private location: Location) { }

  ngOnInit() {
      this.editFlag = false;
      this.getArticle();
  }
    
  getArticle(): void{ 
      const id = +this.route.snapshot.paramMap.get('id');
      this.articleService.getArticle(id).subscribe(article => this.article = article);
  }
    
  edit(): void{ this.editFlag = true; }
    
  save(): void{
      this.editFlag = false;
      this.articleService.updateArticle(this.article).subscribe(() => this.goBack());
      }
    
  goBack(): void {
      this.location.back();
  }
}
