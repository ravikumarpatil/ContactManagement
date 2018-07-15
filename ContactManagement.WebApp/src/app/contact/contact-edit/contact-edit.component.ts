import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService, NotificationType } from '../../_services/notification.service';
import { LoaderService } from '../../_services/loader.service';
import { Contact } from '../../_entities/contact';
import { ContactService } from '../../_services/contact.service';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {

  contactForm: FormGroup;
  id: FormControl;
  status: FormControl;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  phoneNumber: FormControl;

  constructor(
    private contactService: ContactService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private loaderService: LoaderService) { }

  ngOnInit() {
    this.createForm(Object.assign(new Contact(), {}));
    let id = this.activatedRoute.snapshot.queryParams['id'];
    this.getContact(id);
  }

  createFormControls(contact: Contact) {
    this.id = new FormControl(contact.id);
    this.firstName = new FormControl(contact.firstName, [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(/^[a-zA-Z]+$/)]);
    this.lastName = new FormControl(contact.lastName, [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern(/^[a-zA-Z]+$/)]);
    this.email = new FormControl(contact.email, [Validators.required, Validators.maxLength(200), Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)]);
    this.phoneNumber = new FormControl(contact.phoneNumber, [Validators.required, Validators.maxLength(18), Validators.pattern(/^(\+\d{1,2}\s?)?(\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/)]);
    // Matches the following US numbers
    // 123-456-7890    //(123)-456-7890    //1234567890    //123 456 7890    //123.456.7890    //+91 (123)-456-7890
    this.status = new FormControl(contact.status);
  }

  createForm(contact: Contact) {
    this.createFormControls(contact);
    this.contactForm = new FormGroup({
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      status: this.status
    });
  }

  getContact(id: number) {
    this.loaderService.loading = true;
    this.contactService.getContact(id)
      .toPromise()
      .then((response: any) => {
        this.createForm(response);
        this.loaderService.loading = false;
      }, error => {
        this.notificationService.errorMessage('ContactEditComponent', 'getContact', 'getContact', error);
        this.loaderService.loading = false;
      });
  }

  updateContact(contact: Contact, isFormValid: boolean) {
    if (isFormValid) {
      this.loaderService.loading = true;
      this.contactService.updateContact(contact)
        .toPromise()
        .then((response: any) => {

          if (response === true) {
            this.notificationService.showNotification('Contact updated successfully.', NotificationType.Success);
            this.router.navigate([`/contact/index`]);
          }
          this.loaderService.loading = false;
        }, error => {
          this.notificationService.errorMessage('ContactEditComponent', 'updateContact', 'updateContact', error);
          this.loaderService.loading = false;
        });
    }
  }

}
