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
  selectedFile!: File | null;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(private formBuilder: FormBuilder, private newsService: NewsService, private router: Router){

  }

  ngOnInit(): void {
      this.addForm = this.formBuilder.group({
        title:[null, Validators.required],
        content: [null, Validators.required]
      });
  }

  // onSubmitForm(){
  //   if(this.addForm.valid){
  //     this.newsService.addNews(this.addForm.value).subscribe(
  //       {
  //         next: (response) => {
  //           console.log('News created successfully', response);
  //           this.router.navigateByUrl("/actualites");

  //         },
  //         error: (error) => {
  //           console.log("Error creating news", error);
  //         }
  //       }
  //     )
  //   }
  // }

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

  onSubmitForm(): void {
    if (this.addForm.valid) {
      const formData = new FormData();
      formData.append('title', this.addForm.get('title')?.value);
      formData.append('content', this.addForm.get('content')?.value);
    // Formater la date au format yyyy:mm:dd
      const date: Date = new Date();
      const formattedDate = `${date.getFullYear()}:${(date.getMonth() + 1).toString().padStart(2, '0')}:${date.getDate().toString().padStart(2, '0')}`;
      formData.append('createdDate', formattedDate); // Date formatée

      if (this.selectedFile) {
        formData.append('picturePath', this.selectedFile);
      }

      this.newsService.addNews(formData).subscribe(
        {
          next: (response) => {
            console.log('News added successfully', response);
            this.router.navigateByUrl('/actualites');
          },
          error: (error) => {
            console.error('Error adding news', error);
          }
        }
      );
    }
  }

}
