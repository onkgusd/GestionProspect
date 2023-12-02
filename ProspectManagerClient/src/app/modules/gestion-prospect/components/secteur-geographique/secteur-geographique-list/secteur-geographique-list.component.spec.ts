import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecteurGeographiqueListComponent } from './secteur-geographique-list.component';

describe('SecteurGeographiqueListComponent', () => {
  let component: SecteurGeographiqueListComponent;
  let fixture: ComponentFixture<SecteurGeographiqueListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecteurGeographiqueListComponent]
    });
    fixture = TestBed.createComponent(SecteurGeographiqueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
