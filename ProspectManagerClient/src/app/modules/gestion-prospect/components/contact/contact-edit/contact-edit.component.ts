import { Component, OnInit } from '@angular/core';
import { Contact } from '../../../models/contact';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../../../services/contact.service';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit {

  contact: Contact;
  isLoading: boolean = true;

  constructor(private contactService: ContactService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const idContact: string | null = this.route.snapshot.paramMap.get("idContact");
    if (idContact)
      this.contactService.get(+idContact)
        .subscribe(
          contact => {
            this.contact = contact;
            this.isLoading = false;
          });
  }
}
