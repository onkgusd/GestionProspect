import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatutListComponent } from './statut-list.component';

describe('StatutListComponent', () => {
  let component: StatutListComponent;
  let fixture: ComponentFixture<StatutListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatutListComponent]
    });
    fixture = TestBed.createComponent(StatutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
