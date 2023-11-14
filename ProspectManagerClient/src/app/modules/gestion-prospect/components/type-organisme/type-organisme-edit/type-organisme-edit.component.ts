import { Component } from '@angular/core';
import { TypeOrganisme } from '../../../models/type-organisme';
import { TypeOrganismeService } from '../../../services/type-organisme.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-type-organisme-edit',
  templateUrl: './type-organisme-edit.component.html',
  styleUrls: ['./type-organisme-edit.component.scss']
})
export class TypeOrganismeEditComponent {
  typeOrganisme: TypeOrganisme;
  isLoading: boolean = true;

  constructor(private typeOrganismeService: TypeOrganismeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const typeOrganismeId: string | null = this.route.snapshot.paramMap.get("id");
    if (typeOrganismeId)
      this.typeOrganismeService.getTypeOrganisme(+typeOrganismeId)
        .subscribe(
          typeOrganisme => {
            this.typeOrganisme = typeOrganisme;
            this.isLoading = false;
          });
  }
}
