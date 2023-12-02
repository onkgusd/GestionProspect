import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecteurGeographiqueAddComponent } from './secteur-geographique-add.component';

describe('SecteurGeographiqueAddComponent', () => {
  let component: SecteurGeographiqueAddComponent;
  let fixture: ComponentFixture<SecteurGeographiqueAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecteurGeographiqueAddComponent]
    });
    fixture = TestBed.createComponent(SecteurGeographiqueAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
