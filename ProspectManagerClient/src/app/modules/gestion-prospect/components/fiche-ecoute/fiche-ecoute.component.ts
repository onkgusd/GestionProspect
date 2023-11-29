import { Component, Input, OnInit } from '@angular/core';
import { Prospect } from '../../models/prospect';
import { ProspectService } from '../../services/prospect.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-fiche-ecoute',
  templateUrl: './fiche-ecoute.component.html',
  styleUrls: ['./fiche-ecoute.component.scss']
})
export class FicheEcouteComponent implements OnInit {
  @Input() idProspect: number;
  prospect: Prospect = new Prospect();
  isLoading: boolean;

  constructor(private prospectService: ProspectService, private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    if (this.idProspect)
      this.prospectService.get(this.idProspect)
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

  getFilledArray(array: any[], minLength: number): any[] {
      return [...array, ...Array(minLength).fill(null)];
  }

  completeStringWithDots(inputString: string, targetLength: number): string {
    let completedString = inputString || '';
    while (completedString.length < targetLength) {
      completedString += '.';
    }
    return completedString;
  }
}

