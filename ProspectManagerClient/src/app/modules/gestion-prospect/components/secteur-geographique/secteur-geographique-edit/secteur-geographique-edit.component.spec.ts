import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecteurGeographiqueEditComponent } from './secteur-geographique-edit.component';

describe('SecteurGeographiqueEditComponent', () => {
  let component: SecteurGeographiqueEditComponent;
  let fixture: ComponentFixture<SecteurGeographiqueEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecteurGeographiqueEditComponent]
    });
    fixture = TestBed.createComponent(SecteurGeographiqueEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
