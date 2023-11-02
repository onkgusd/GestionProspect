import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeEvenementListComponent } from './type-evenement-list.component';

describe('TypeEvenementListComponent', () => {
  let component: TypeEvenementListComponent;
  let fixture: ComponentFixture<TypeEvenementListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeEvenementListComponent]
    });
    fixture = TestBed.createComponent(TypeEvenementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
