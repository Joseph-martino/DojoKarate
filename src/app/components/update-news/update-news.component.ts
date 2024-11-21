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
  selectedFile!: File | null;
  previewUrl: string | ArrayBuffer | null = null;

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

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];

      // Gérer l'aperçu de l'image
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmitForm(){
    if(this.updateForm.valid){
      // const updatednews = new News();
      // updatednews.newsId = this.news.newsId;
      // updatednews.title = this.updateForm.value.title;
      // updatednews.content = this.updateForm.value.content;
      // updatednews.createdDate = this.news.createdDate;

      const formData = new FormData();
      //formData.append('newsId', this.updateForm.get('newsId')?.value);
      formData.append('title', this.updateForm.get('title')?.value);
      formData.append('content', this.updateForm.get('content')?.value);
    // Formater la date au format yyyy:mm:dd
      const date: Date = new Date();
      const formattedDate = `${date.getFullYear()}:${(date.getMonth() + 1).toString().padStart(2, '0')}:${date.getDate().toString().padStart(2, '0')}`;
      formData.append('createdDate', formattedDate); // Date formatée

      if (this.selectedFile) {
        formData.append('picturePath', this.selectedFile);
      }
      console.log("bonjour");
      console.log("titre: " + formData.get('title'));
      console.log("content: " + formData.get('content'));
      console.log("picturePath: " + formData.get('picturePath'));

      this.newsService.updateNews(this.news.newsId, formData).subscribe(
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
