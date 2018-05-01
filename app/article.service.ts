import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Article } from './article';
import { ARTICLES } from './mock-articles';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ArticleService {

    private articlesUrl = 'http://localhost:8080/demo';
    
  constructor(private http: HttpClient) { }
    
  getArticles(): Observable<Article[]> {
      return this.http.get<Article[]>(`${this.articlesUrl}/search/tag/test`).pipe(catchError(this.handleError<Article[]>('searchTag', [])));
  }
   
    getArticle(id: number): Observable<Article> {
        const url = `${this.articlesUrl}/${id}`;
        return this.http.get<Article>(url).pipe(catchError(this.handleError<Article>(`getArticle id=${id}`)));
        }
    
    updateArticle(article: Article): Observable<Article> {
        const url = `${this.articlesUrl}/${article.id}/edit`;
        return this.http.post<Article>(url,article, httpOptions).pipe(catchError(this.handleError<Article>('updateArticle')));
        }
    
    addArticle(article: Article): Observable<Article> {
        const url = `${this.articlesUrl}/new`;
        return this.http.post<Article>(url,article, httpOptions).pipe(catchError(this.handleError<Article>('addArticle')));
        }
    
    searchTitle(term: string): Observable<Article[]> {
        if (!term.trim()) {
            // if not search term, return empty hero array.
            return of([]);
        }
        return this.http.get<Article[]>(`${this.articlesUrl}/search/title/${term}`).pipe(catchError(this.handleError<Article[]>('searchTitle', [])));
    }
    
    searchTag(term: string): Observable<Article[]> {
        if (!term.trim()) {
            // if not search term, return empty hero array.
            return of([]);
        }
        return this.http.get<Article[]>(`${this.articlesUrl}/search/tag/${term}`).pipe(catchError(this.handleError<Article[]>('searchTag', [])));
    }
    
    searchCategory(term: string): Observable<Article[]> {
        if (!term.trim()) {
            // if not search term, return empty hero array.
            return of([]);
        }
        return this.http.get<Article[]>(`${this.articlesUrl}/search/category/${term}`).pipe(catchError(this.handleError<Article[]>('searchCategory', [])));
    }
    
    
    /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    //this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}
