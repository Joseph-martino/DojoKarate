import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewsService } from '../../services/news.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrl: './add-news.component.scss'
})
export class AddNewsComponent implements OnInit{

  addForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private newsService: NewsService, private router: Router){

  }

  ngOnInit(): void {
      this.addForm = this.formBuilder.group({
        title:[null, Validators.required],
        content: [null, Validators.required]
      });
  }

  onSubmitForm(){
    if(this.addForm.valid){
      this.newsService.addNews(this.addForm.value).subscribe(
        {
          next: (response) => {
            console.log('News created successfully', response);
            this.router.navigateByUrl("/actualites");

          },
          error: (error) => {
            console.log("Error creating news", error);
          }
        }
      )
    }
  }

}
