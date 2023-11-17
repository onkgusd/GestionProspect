import { Component } from '@angular/core';
import { TypeOrganisme } from '../../../models/type-organisme';
import { TypeOrganismeService } from '../../../services/type-organisme.service';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-type-organisme-edit',
  templateUrl: './type-organisme-edit.component.html',
  styleUrls: ['./type-organisme-edit.component.scss']
})
export class TypeOrganismeEditComponent {
  typeOrganisme: TypeOrganisme;
  isLoading: boolean = true;

  constructor(private typeOrganismeService: TypeOrganismeService, private route: ActivatedRoute, private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    const typeOrganismeId: string | null = this.route.snapshot.paramMap.get("id");
    if (typeOrganismeId)
      this.typeOrganismeService.get(+typeOrganismeId)
        .pipe(finalize(() => this.isLoading = false))
        .subscribe(
          {
            next: typeOrganisme => {
              this.typeOrganisme = typeOrganisme;
              this.isLoading = false;
            },
            error: error => this.snackbarService.openErrorSnackBar("😵 Erreur lors du chargement du type d'organisme.")
          });
  }
}
