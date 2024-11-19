import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewsService } from '../../services/news.service';
import { ActivatedRoute, Router } from '@angular/router';
import { News } from '../../models/News';
import { title } from 'process';


@Component({
  selector: 'app-update-news',
  templateUrl: './update-news.component.html',
  styleUrl: './update-news.component.scss'
})
export class UpdateNewsComponent implements OnInit{

  updateForm!: FormGroup;
  news!: News;

  constructor(
    private formBuilder: FormBuilder, 
    private newsService: NewsService, 
    private router: Router, 
    private route: ActivatedRoute){

  }

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      title:[null, Validators.required],
      content: [null, Validators.required]
    });

    const newsId: number = +this.route.snapshot.params['id'];

    this.newsService.getNewsById(newsId).subscribe(
      (news) => { this.news = news;

        this.updateForm.patchValue({
          title: news.title,
          content: news.content
        });
      }
    );
  }

  onSubmitForm(){
    if(this.updateForm.valid){
      const updatednews = new News();
      updatednews.newsId = this.news.newsId;
      updatednews.title = this.updateForm.value.title;
      updatednews.content = this.updateForm.value.content;
      updatednews.createdDate = this.news.createdDate;

      this.newsService.updateNews(updatednews).subscribe(
        {
          next: (response) => {
            console.log('News updated successfully', response);
            this.router.navigateByUrl("/actualites");

          },
          error: (error) => {
            console.log("Error updating news", error);
          }
        }
      )
    }
  }
}
