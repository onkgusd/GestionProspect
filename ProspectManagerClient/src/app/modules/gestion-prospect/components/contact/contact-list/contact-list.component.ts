import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Contact } from '../../../models/contact';
import { ContactService } from '../../../services/contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})

export class ContactListComponent implements OnInit {
  contacts: MatTableDataSource<Contact>;
  displayedColumns: string[] = ['nom', 'fonction', 'email', 'telephone', 'actif'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() idProspect: number;
  @Input() contactList: Contact[];

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    if (this.contactList) {
      this.contacts = new MatTableDataSource(this.contactList);
    }
    else {
      this.contactService.getContacts(this.idProspect).subscribe((contacts: Contact[]) => {
        this.contacts = new MatTableDataSource(contacts);
      });
    }

    this.contacts.sort = this.sort;
    this.contacts.paginator = this.paginator;

  }
}
