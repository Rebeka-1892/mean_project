import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-article-list',
  imports: [],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.css'
})
export class ArticleListComponent implements OnInit {
  articles: any[] = [];
  article: any;
  constructor(private articleService: ArticleService) { }
  ngOnInit(): void {
    this.loadArticles();
  }
  loadArticles(): void {
    this.articleService.getArticles().subscribe(data => this.articles =
      data);
  }
  deleteArticle(id: string): void {
    this.articleService.deleteArticle(id).subscribe(() =>
      this.loadArticles());
  }
}
