import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOrganismeEditComponent } from './type-organisme-edit.component';

describe('TypeOrganismeEditComponent', () => {
  let component: TypeOrganismeEditComponent;
  let fixture: ComponentFixture<TypeOrganismeEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeOrganismeEditComponent]
    });
    fixture = TestBed.createComponent(TypeOrganismeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
