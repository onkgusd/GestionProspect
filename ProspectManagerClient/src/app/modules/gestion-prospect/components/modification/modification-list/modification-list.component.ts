import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Modification } from '../../../models/modification';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-modification-list',
  templateUrl: './modification-list.component.html',
  styleUrls: ['./modification-list.component.scss']
})
export class ModificationListComponent implements OnInit {
  modifications: MatTableDataSource<Modification>;
  displayedColumns: string[] = ['dateModification', 'champ', 'ancienneValeur', 'nouvelleValeur', 'utilisateur'];

  @ViewChild(MatSort)
  set sort(value: MatSort) {
    if (this.modifications) {
      this.modifications.sort = value;
    }
  }

  @ViewChild(MatPaginator)
  set paginator(value: MatPaginator) {
    if (this.modifications) {
      this.modifications.paginator = value;
    }
  }

  @Input() modificationList: Modification[];

  
  ngOnInit(): void {
    this.modifications = new MatTableDataSource(this.modificationList);
  }
}
