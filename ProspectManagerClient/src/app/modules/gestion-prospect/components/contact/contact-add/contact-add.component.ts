import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.scss']
})
export class ContactAddComponent implements OnInit {
  prospectId: string | null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.prospectId = this.route.snapshot.paramMap.get('id');
  }
}
