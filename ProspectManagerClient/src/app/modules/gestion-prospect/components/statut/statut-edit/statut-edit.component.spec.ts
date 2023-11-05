import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatutEditComponent } from './statut-edit.component';

describe('StatutEditComponent', () => {
  let component: StatutEditComponent;
  let fixture: ComponentFixture<StatutEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatutEditComponent]
    });
    fixture = TestBed.createComponent(StatutEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
