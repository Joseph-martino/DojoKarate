import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { News } from '../../models/News';

@Component({
  selector: 'app-single-news',
  templateUrl: './single-news.component.html',
  styleUrl: './single-news.component.scss'
})
export class SingleNewsComponent implements OnInit{

  news!: News;

  constructor(private route: ActivatedRoute, private newsService: NewsService, private router: Router){

  }

  ngOnInit(): void {
    const newsId: number = +this.route.snapshot.params['id'];

    this.newsService.getNewsById(newsId).subscribe(
      news => this.news = news
    );
  }

  // onUpdateNews(news: News){
  //   console.log("test mise à jour service");
  //   this.newsService.updateNews(news).subscribe({
  //     next: () => {
  //       console.log(`Actualité avec l'ID ${news.newsId} mise à jour avec succès`);
  //       this.router.navigateByUrl("/actualites");
  //     },
  //     error: (error) => {
  //       console.error(`Erreur dans la mise à jour de l'actualité ayant pour ID ${news.newsId}`, error);
  //     }
  //   });
  // }

  onGotoUpdatePage(){
    this.router.navigateByUrl(`update/${this.news.newsId}`);
  }

  onDeleteNews(newsId: number){
    this.newsService.deleteNews(newsId).subscribe({
      next: () => {
        console.log(`Actualité avec l'ID ${newsId} supprimée avec succès`);
        this.router.navigateByUrl("/actualites");
      },
      error: (error) => {
        console.error(`Erreur dans la suppression de l'actualité ayant pour ID ${newsId}`, error);
      }
    });
  }
}
