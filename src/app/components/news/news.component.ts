import { Component, OnInit } from '@angular/core';
import { News } from '../../models/News';
import { NewsService } from '../../services/news.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent implements OnInit{

  newsList!: News[];
  constructor(private newsService: NewsService, private router: Router){

  }

  ngOnInit(): void {
    console.log("test observable");
    this.newsService.getAllNews().subscribe(
      newsList => this.newsList = newsList
    );
  }

  onGoToSingleNewsPage(newsId: number){
    this.router.navigateByUrl(`actualites/${newsId}`);
  }

  onGoToAddNewsPage(){
    this.router.navigateByUrl("creer");
  }
}
