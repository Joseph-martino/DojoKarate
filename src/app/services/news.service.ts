import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { News } from '../models/News';
import { ActivatedRoute } from '@angular/router';
import { Contact } from '../models/Contact';

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
    return this.http.get<News[]>('http://localhost:8080/DojoKarate/rest/news').pipe(
      tap((newsList) => this.logInfo(newsList)),
      catchError((error) => this.logError(error, []))
    );
  }

  getNewsListForPage(pageNumber: number, pageSize: number): Observable<News[]>{
    let params = new HttpParams();
    params = params.set("pageNumber", pageNumber.toString());
    params = params.set("pageSize", pageSize.toString());

    return this.http.get<News[]>('http://localhost:8080/DojoKarate/rest/news/test', { params: params }).pipe(
      tap((menuList) => this.logInfo(menuList)),
      catchError((error) =>  this.logError(error,[])
      )
    );
  }

  getNewsTotalNumber(): Observable<number>{
    return this.http.get<number>('http://localhost:8080/DojoKarate/rest/news/total').pipe(
      tap((totalNumber) => this.logInfo(totalNumber)),
      catchError((error) => this.logError(error, undefined))
    );
  }

  addNews(formData: FormData): Observable<any> {
    return this.http.post('http://localhost:8080/DojoKarate/rest/news/create', formData).pipe(
      tap((response) => this.logInfo(response)),
      catchError((error) => this.logError(error, undefined))
    );
  }

  updateNews(newsId: number, formData: FormData): Observable<any> {
    return this.http.put<News>(`http://localhost:8080/DojoKarate/rest/news/update/${newsId}`, formData).pipe(
      tap((response) => this.logInfo(response)),
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

  sendContactMessage(formValue: { firstName: string, familyName: string, email: string, message: string}){
    const contact: Contact = new Contact();
    contact.firstName = formValue.firstName;
    contact.familyName = formValue.familyName;
    contact.email = formValue.email;
    contact.message = formValue.message;
    console.log(contact);

    return this.http.post<Contact>('http://localhost:8080/DojoKarate/rest/contact', contact).pipe(
      tap((response) => this.logInfo(response)),
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
