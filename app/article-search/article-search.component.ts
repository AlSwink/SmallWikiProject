import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Article } from '../article';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article-search',
  templateUrl: './article-search.component.html',
  styleUrls: ['./article-search.component.css']
})
export class ArticleSearchComponent implements OnInit {

    article$ : Observable<Article[]>;
    private searchTerms = new Subject<string>();
    
  constructor(private articleService: ArticleService) { }
    
    search(term: string): void {
        this.searchTerms.next(term);
        }

  ngOnInit() {
      this.article$ = this.searchTerms.pipe( debounceTime(300), distinctUntilChanged(), switchMap((term: string) => this.articleService.searchTitle(term)));
  }

}
