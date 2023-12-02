import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Prospect } from '../../../models/prospect';
import { ActivatedRoute } from '@angular/router';
import { ProspectService } from '../../../services/prospect.service';
import { Modification } from '../../../models/modification';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { finalize } from 'rxjs';
import { PrintService } from 'src/app/services/print.service';

@Component({
  selector: 'app-prospect-edit',
  templateUrl: './prospect-edit.component.html',
  styleUrls: ['./prospect-edit.component.scss']
})
export class ProspectEditComponent implements OnInit {

  prospect: Prospect;
  isLoading: boolean = true;
  modifications: Modification[];
  isOnModificationsTab: boolean;
  tabIndex: number = 0;

  @ViewChild('printContainer', { read: ElementRef }) printContainer: ElementRef;

  constructor(private prospectService: ProspectService,
              private route: ActivatedRoute,
              private snackbarService: SnackbarService,
              private printService: PrintService) { }

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
    this.isOnModificationsTab = index === 4;
    this.tabIndex = index;
  }

  printFicheRencontre(): void {
    let printHead = document.head.innerHTML;
    this.printService.printHtml(this.printContainer.nativeElement.innerHTML, printHead);
  }
}
