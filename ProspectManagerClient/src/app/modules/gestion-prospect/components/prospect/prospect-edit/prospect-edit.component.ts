import { Component, OnInit } from '@angular/core';
import { Prospect } from '../../../models/prospect';
import { ActivatedRoute } from '@angular/router';
import { ProspectService } from '../../../services/prospect.service';
import { Modification } from '../../../models/modification';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-prospect-edit',
  templateUrl: './prospect-edit.component.html',
  styleUrls: ['./prospect-edit.component.scss']
})
export class ProspectEditComponent implements OnInit {

  prospect: Prospect;
  isLoading: boolean = true;
  modifications: Modification[];
  onModificationsTab: boolean;

  constructor(private prospectService: ProspectService, private route: ActivatedRoute, private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    const prospectId: string | null = this.route.snapshot.paramMap.get("id");
    if (prospectId)
      this.prospectService.get(+prospectId)
        .pipe(finalize(() => this.isLoading = false))
        .subscribe(
          {
            next: prospect => {
              this.prospect = prospect;
              this.isLoading = false;
            },
            error: error => this.snackbarService.openErrorSnackBar("😵 Erreur lors du chargement du prospect.")
          }
        );
  }

  onTabChange(index: number) {
    this.onModificationsTab = index === 4;
  }
}
