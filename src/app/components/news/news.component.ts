import { Component, OnInit } from '@angular/core';
import { News } from '../../models/News';
import { NewsService } from '../../services/news.service';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError, timeout } from 'rxjs';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent implements OnInit{

  newsList!: News[];
  currentPageNumber!: number;
  totalNumberOfNews$!: Observable<number>;
  totalNumberOfPages$!: Observable<number>;
  pageNumber: number = 1;
  pageSize: number = 6;
  
  constructor(private newsService: NewsService, private router: Router){
    this.currentPageNumber = 1;

  }

  ngOnInit(): void {
    // this.newsService.getAllNews().subscribe(
    //   newsList => this.newsList = newsList
    // );

    this.totalNumberOfNews$ = this.newsService.getNewsTotalNumber();
    this.totalNumberOfPages$ = this.totalNumberOfNews$.pipe(
      map(totalNumberOfNews => Math.ceil(totalNumberOfNews/this.pageSize))
    );

    this.newsService.getNewsListForPage(this.pageNumber, this.pageSize).pipe(
      timeout(12000),
      catchError((error) => {
        //this.isLoading = false,
        this.router.navigateByUrl("/404-error")
        return throwError(() => new Error("A problem has occured, please try late"))
      })
    )
    .subscribe(newsList => /*{*/this.newsList = newsList,
      //this.isLoading = false;
      //}
    );
  }

  onGoToSingleNewsPage(newsId: number){
    this.router.navigateByUrl(`actualites/${newsId}`);
  }

  onGoToAddNewsPage(){
    this.router.navigateByUrl("creer");
  }

  onGetCurrentPageNews(pageNumber: number){
    this.newsService.getNewsListForPage(pageNumber, this.pageSize).pipe(
      timeout(12000),
      catchError((error) => {
        //this.isLoading = false,
        this.router.navigateByUrl("/404-error")
        return throwError(() => new Error("A problem has occured, please try late"))
      })
    )
    .subscribe(menuList => this.newsList = menuList);
  }
}
