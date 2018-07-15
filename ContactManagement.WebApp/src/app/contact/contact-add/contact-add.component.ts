import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService, NotificationType } from '../../_services/notification.service';
import { LoaderService } from '../../_services/loader.service';
import { ContactService } from '../../_services/contact.service';
import { Contact } from '../../_entities/contact';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.css']
})
export class ContactAddComponent implements OnInit {

  contactForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  phoneNumber: FormControl;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private notificationService: NotificationService,
    private loaderService: LoaderService) { }

  ngOnInit() {
    this.createForm();
  }

  createFormControls() {
    this.firstName = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(/^[a-zA-Z]+$/)]);
    this.lastName = new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern(/^[a-zA-Z]+$/)]);
    this.email = new FormControl('', [Validators.required, Validators.maxLength(200), Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)]);
    this.phoneNumber = new FormControl('', [Validators.required, Validators.maxLength(18), Validators.pattern(/^(\+\d{1,2}\s?)?(\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/)]);
    // Matches the following US numbers
    // 123-456-7890    //(123)-456-7890    //1234567890    //123 456 7890    //123.456.7890    //+91 (123)-456-7890
  }

  createForm() {
    this.createFormControls();
    this.contactForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phoneNumber: this.phoneNumber
    });
  }

  createContact(contact: Contact, isFormValid: boolean) {
    if (isFormValid) {
      this.loaderService.loading = true;
      this.contactService.createContact(contact)
        .toPromise()
        .then((response: any) => {

          if (response === true) {
            this.notificationService.showNotification('Contact added successfully.', NotificationType.Success);
            this.router.navigate([`/contact/index`]);
          }
          this.loaderService.loading = false;
        }, error => {
          this.notificationService.errorMessage('ContactAddComponent', 'createContact', 'createContact', error);
          this.loaderService.loading = false;
        });
    }
  }

}
