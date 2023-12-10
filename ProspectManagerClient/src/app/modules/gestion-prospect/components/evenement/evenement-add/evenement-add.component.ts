import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-evenement-add',
  templateUrl: './evenement-add.component.html',
  styleUrls: ['./evenement-add.component.scss']
})
export class EvenementAddComponent {
  idProspect: string | null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.idProspect = this.route.snapshot.paramMap.get('id');
  }
}