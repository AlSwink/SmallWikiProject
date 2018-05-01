import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    { path: '', redirectTo: '/articles', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },        
    { path: 'articles', component: ArticlesComponent },
    { path: 'detail/:id', component: ArticleDetailComponent }
];   

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [
    RouterModule
  ]
  
})
export class AppRoutingModule {
     
}
