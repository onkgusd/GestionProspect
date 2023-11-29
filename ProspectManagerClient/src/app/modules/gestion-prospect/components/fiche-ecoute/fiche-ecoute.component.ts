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
  @Input() prospect: Prospect = new Prospect();
  prospects: Prospect[] = [];
  standalone: boolean;
  isLoading: boolean;

  constructor(private prospectService: ProspectService, private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.standalone = !(this.idProspect && this.prospect);

    if (this.idProspect)
    {
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
    else if (this.standalone) {
      this.prospectService.getAll()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(
        {
          next: prospects => {
            this.prospects = prospects;
            this.isLoading = false;
          },
          error: error => this.snackbarService.openErrorSnackBar("😵 Erreur lors du chargement du prospect.")
        }
      );
    }
  }

  getFilledArray<T>(array: T[] = [], minLength: number): T[] {
      return [...array ?? [], ...Array(minLength).fill({})];
  }

  completeStringWithDots(inputString: string, targetLength: number): string {
    let completedString = inputString || '';
    while (completedString.length < targetLength) {
      completedString += '.';
    }
    return completedString;
  }

  resetProspect() {
    this.prospect = new Prospect();
  }

  printFicheRencontre(): void {
    window.print();
  }
}

