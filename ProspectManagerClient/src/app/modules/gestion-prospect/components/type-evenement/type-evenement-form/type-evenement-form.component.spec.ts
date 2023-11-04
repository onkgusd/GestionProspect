import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeEvenementFormComponent } from './type-evenement-form.component';

describe('TypeEvenementFormComponent', () => {
  let component: TypeEvenementFormComponent;
  let fixture: ComponentFixture<TypeEvenementFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeEvenementFormComponent]
    });
    fixture = TestBed.createComponent(TypeEvenementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
