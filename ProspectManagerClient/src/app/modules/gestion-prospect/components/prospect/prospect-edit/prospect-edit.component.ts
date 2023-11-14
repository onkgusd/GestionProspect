import { Component, OnInit } from '@angular/core';
import { Prospect } from '../../../models/prospect';
import { ActivatedRoute } from '@angular/router';
import { ProspectService } from '../../../services/prospect.service';

@Component({
  selector: 'app-prospect-edit',
  templateUrl: './prospect-edit.component.html',
  styleUrls: ['./prospect-edit.component.scss']
})
export class ProspectEditComponent implements OnInit {

  prospect: Prospect;
  isLoading: boolean = true;

  constructor(private prospectService: ProspectService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const prospectId: string | null = this.route.snapshot.paramMap.get("id");
    if (prospectId)
      this.prospectService.get(+prospectId)
        .subscribe(
          prospect => {
            this.prospect = prospect;
            this.isLoading = false;
          }
        );
  }
}
