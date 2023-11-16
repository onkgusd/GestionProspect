import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Prospect } from '../../../models/prospect';
import { ProspectService } from '../../../services/prospect.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-prospect-list',
  templateUrl: './prospect-list.component.html',
  styleUrls: ['./prospect-list.component.scss']
})

export class ProspectListComponent implements OnInit {
  @Input() isPrintable: boolean;
  @Input() prospectList: Prospect[];

  prospects: MatTableDataSource<Prospect>;
  displayedColumns: string[] = ['type-organisme', 'nom', 'statut', 'departement', 'secteurActivite', 'telephone', 'mail', 'dateCreation'];
  isLoading: boolean = true;

  @ViewChild(MatSort)
  set sort(value: MatSort) {
    if (this.prospects) {
      this.prospects.sort = value;
    }
  }

  @ViewChild(MatPaginator)
  set paginator(value: MatPaginator) {
    if (this.prospects) {
      this.prospects.paginator = value;
    }
  }

  constructor(private prospectService: ProspectService) { }

  ngOnInit(): void {
    if (this.prospectList !== void 0) {
      this.prospects = new MatTableDataSource(this.prospectList);
      this.isLoading = false;
    }
    else {
      this.prospectService.getAll().subscribe((prospects: Prospect[]) => {
        this.prospects = new MatTableDataSource(prospects);
        this.isLoading = false;
      });
    }
  }

  printList() {
    window.print();
  }
}
