import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecteurGeographiqueFormComponent } from './secteur-geographique-form.component';

describe('SecteurGeographiqueFormComponent', () => {
  let component: SecteurGeographiqueFormComponent;
  let fixture: ComponentFixture<SecteurGeographiqueFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecteurGeographiqueFormComponent]
    });
    fixture = TestBed.createComponent(SecteurGeographiqueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
