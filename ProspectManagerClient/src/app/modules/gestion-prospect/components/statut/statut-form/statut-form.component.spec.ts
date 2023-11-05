import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatutFormComponent } from './statut-form.component';

describe('StatutFormComponent', () => {
  let component: StatutFormComponent;
  let fixture: ComponentFixture<StatutFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatutFormComponent]
    });
    fixture = TestBed.createComponent(StatutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
