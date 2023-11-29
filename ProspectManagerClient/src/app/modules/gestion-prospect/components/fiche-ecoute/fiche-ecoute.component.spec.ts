import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheEcouteComponent } from './fiche-ecoute.component';

describe('FicheEcouteComponent', () => {
  let component: FicheEcouteComponent;
  let fixture: ComponentFixture<FicheEcouteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FicheEcouteComponent]
    });
    fixture = TestBed.createComponent(FicheEcouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
