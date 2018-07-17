import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../_services/contact.service';
import { TableService } from '../../_services/table.service';
import { NotificationService, NotificationType } from '../../_services/notification.service';
import { LoaderService } from '../../_services/loader.service';

@Component({
  selector: 'app-contact-index',
  templateUrl: './contact-index.component.html',
  styleUrls: ['./contact-index.component.css']
})
export class ContactIndexComponent implements OnInit {

  contacts: any;
  pageSize: number = 5;
  pager: any = {};
  pagedData: any;
  filteredData: any;
  filterKey = '';
  sortBy = '';
  sortAsc = false;

  constructor(
    private contactService: ContactService,
    private tableService: TableService,
    private notificationService: NotificationService,
    private loaderService: LoaderService) { }

  ngOnInit() {
    this.getAllContacts();
  }

  getAllContacts() {
    this.loaderService.loading = true;
    this.contactService.getAllContacts()
      .toPromise()
      .then(response => {
        this.contacts = response;
        this.filteredData = response;
        this.setPage(1);
        this.loaderService.loading = false;
      }, error => {
        this.notificationService.errorMessage('ContactIndexComponent', 'getAllContacts', 'getAllContacts', error);
        this.loaderService.loading = false;
      });
  }

  deleteContact(id: number) {
    this.loaderService.loading = true;
    this.contactService.deleteContact(id)
      .toPromise()
      .then(response => {
        if (response === true) {
          this.getAllContacts();
          this.notificationService.showNotification('Contact deleted successfully.', NotificationType.Success);
        }
        this.loaderService.loading = false;
      }, error => {
        this.notificationService.errorMessage('ContactIndexComponent', 'deleteContact', 'deleteContact', error);
        this.loaderService.loading = false;
      });
  }

  setPage(page: number) {
    if (page < 1 || (page > this.pager.totalPages && this.pager.totalPages > 0)) {
      return;
    }
    // get pager object from service
    this.pager = this.tableService.getPager(this.filteredData.length, page, this.pageSize);

    // get current page of items
    this.pagedData = this.filteredData.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  filter() {
    if (this.filterKey !== '') {
      this.filteredData = this.contacts.filter(function (e) {
        return (
          (e.firstname && e.firstname.toLowerCase().indexOf(this.filterKey.toLowerCase()) > -1) ||
          (e.lastname && e.lastname.toLowerCase().indexOf(this.filterKey.toLowerCase()) > -1) ||
          (e.email && e.email.toLowerCase().indexOf(this.filterKey.toLowerCase()) > -1) ||
          (e.phonenumber && e.phonenumber.toLowerCase().indexOf(this.filterKey.toLowerCase()) > -1)
        );
      }.bind(this));

      this.setPage(1);
    } else {
      this.filteredData = this.contacts;
      this.setPage(1);
    }
  }

  sortDataBy(sortBy: string) {
    if (this.sortBy === sortBy) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortAsc = true;
    }
    this.sortBy = sortBy;
    this.filteredData = this.tableService.sortData(this.filteredData, this.sortBy, this.sortAsc);
    if (this.pager.pages && this.pager.pages.length) {
      this.setPage(this.pager.currentPage);
    } else {
      this.setPage(1);
    }
  }

}
