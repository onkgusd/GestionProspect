import { Component } from '@angular/core';
import { TypeEvenement } from '../../../models/type-evenement';
import { TypeEvenementService } from '../../../services/type-evenement.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-type-evenement-edit',
  templateUrl: './type-evenement-edit.component.html',
  styleUrls: ['./type-evenement-edit.component.scss']
})
export class TypeEvenementEditComponent {
  typeEvenement: TypeEvenement;

  constructor(private typeEvenementService: TypeEvenementService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const typeEvenementId: string | null = this.route.snapshot.paramMap.get("id");
    if (typeEvenementId)
      this.typeEvenementService.getTypeEvenement(+typeEvenementId)
        .subscribe(
          typeEvenement => this.typeEvenement = typeEvenement
        );
  }
}
