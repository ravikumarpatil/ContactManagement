import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../_entities/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient: HttpClient) {
  }

  getAllContacts() {
    return this.httpClient.get(`api/contact`);
  }

  getContact(id: number) {
    return this.httpClient.get(`api/contact/${id}`);
  }

  createContact(contact: Contact) {
    return this.httpClient.post(`api/contact/create`, contact);
  }

  updateContact(contact: Contact) {
    return this.httpClient.put(`api/contact/update`, contact);
  }

  deleteContact(id: number) {
    return this.httpClient.delete(`api/contact/delete?id=${id}`);
  }
}
