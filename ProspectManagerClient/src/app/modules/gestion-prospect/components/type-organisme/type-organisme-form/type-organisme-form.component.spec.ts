import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOrganismeFormComponent } from './type-organisme-form.component';

describe('TypeOrganismeFormComponent', () => {
  let component: TypeOrganismeFormComponent;
  let fixture: ComponentFixture<TypeOrganismeFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeOrganismeFormComponent]
    });
    fixture = TestBed.createComponent(TypeOrganismeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
