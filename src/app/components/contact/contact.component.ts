import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit{

  contactForm!: FormGroup;

  constructor(private formbuilder: FormBuilder, private newsService: NewsService){

  }

  ngOnInit(): void {
      this.contactForm = this.formbuilder.group({
        firstName: [null, Validators.required],
        familyName: [null, Validators.required],
        email: [null, Validators.required],
        message:[null, Validators.required]
      });
  }

  onSubmitForm(){
    if(this.contactForm.valid){
      console.log(this.contactForm.value);
      this.newsService.sendContactMessage(this.contactForm.value).subscribe({
        next: () => console.log("Message envoyé avec succès"),
        error: () => console.log("Erreur dans l'envoi du message")
      })
    }

  }

}
