import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeEvenementEditComponent } from './type-evenement-edit.component';

describe('TypeEvenementEditComponent', () => {
  let component: TypeEvenementEditComponent;
  let fixture: ComponentFixture<TypeEvenementEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeEvenementEditComponent]
    });
    fixture = TestBed.createComponent(TypeEvenementEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
