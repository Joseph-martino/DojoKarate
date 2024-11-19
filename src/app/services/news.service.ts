import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { News } from '../models/News';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  news!: News;
  constructor(private http: HttpClient) { 

  }

  getNewsById(newsId: number): Observable<News>{
    return this.http.get<News>(`http://localhost:8080/DojoKarate/rest/news/${newsId}`).pipe(
      tap((newsList) => this.logInfo(newsList)),
      catchError((error) => this.logError(error, []))
    );
  }

  getAllNews(): Observable<News[]> {
    return this.http.get<News[]>('http://localhost:8080/DojoKarate/rest/news/test').pipe(
      tap((newsList) => this.logInfo(newsList)),
      catchError((error) => this.logError(error, []))
    );
  }

  addNews(formValue: { title: string, content: string}): Observable<News>{
    this.news = new News();
    this.news.title = formValue.title;
    this.news.content = formValue.content;
    const date: Date = new Date();
    this.news.createdDate = date;

    return this.http.post<News>('http://localhost:8080/DojoKarate/rest/news/create', this.news).pipe(
      tap((news) => this.logInfo(news)),
      catchError((error) => this.logError(error, undefined))
    );
  }

  updateNews(news: News): Observable<News>{

    return this.http.put<News>(`http://localhost:8080/DojoKarate/rest/news/update/${news.newsId}`, news).pipe(
      tap((news) => this.logInfo(news)),
      catchError((error) => this.logError(error, undefined))
    );
  }

  deleteNews(newsId: number): Observable<News>{
    console.log("service test suppression");
    return this.http.delete<News>(`http://localhost:8080/DojoKarate/rest/news/delete/${newsId}`).pipe(
      tap((news) => this.logInfo(news)),
      catchError((error) => this.logError(error, undefined))
    );
  }

  private logInfo(response: any){-
    console.table(response);
  }

  private logError(error: Error, errorValue: any){
    console.error(error);
    return of(errorValue);
  }
}
