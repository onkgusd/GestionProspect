import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeEvenementAddComponent } from './type-evenement-add.component';

describe('TypeEvenementAddComponent', () => {
  let component: TypeEvenementAddComponent;
  let fixture: ComponentFixture<TypeEvenementAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeEvenementAddComponent]
    });
    fixture = TestBed.createComponent(TypeEvenementAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
