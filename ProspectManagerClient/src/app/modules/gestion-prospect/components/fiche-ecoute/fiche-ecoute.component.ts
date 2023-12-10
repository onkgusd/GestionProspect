import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Prospect } from '../../models/prospect';
import { ProspectService } from '../../services/prospect.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { finalize } from 'rxjs';
import { ProspectSummaryResponseDto } from '../../dto/prospect-summary-response-dto';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-fiche-ecoute',
  templateUrl: './fiche-ecoute.component.html',
  styleUrls: ['./fiche-ecoute.component.scss']
})
export class FicheEcouteComponent implements OnInit {
  @Input() prospect: Prospect = new Prospect();
  @Input() standalone: boolean = true;
  prospects: ProspectSummaryResponseDto[] = [];
  isLoading: boolean;
  idProspect: number;
  companyName = environment.companyName;

  constructor(private prospectService: ProspectService,
    private snackbarService: SnackbarService,
    private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    if (this.standalone) {
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

  printFicheRencontre(): void {
    if (this.idProspect) {
      this.isLoading = true;
      this.prospectService.get(this.idProspect)
        .pipe(finalize(() => this.isLoading = false))
        .subscribe(
          {
            next: prospect => {
              this.prospect = prospect;
              this.changeDetectorRef.detectChanges();
              setTimeout(() => window.print(), 0);
            },
            error: error => this.snackbarService.openErrorSnackBar("😟 Une erreur est survenue lors du chargement du prospect.")
          }
        )
    }
    else {
      this.prospect = new Prospect();
      this.changeDetectorRef.detectChanges();
      setTimeout(() => window.print(), 0);
    }
  }
}

