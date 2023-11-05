import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatutAddComponent } from './statut-add.component';

describe('StatutAddComponent', () => {
  let component: StatutAddComponent;
  let fixture: ComponentFixture<StatutAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatutAddComponent]
    });
    fixture = TestBed.createComponent(StatutAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
