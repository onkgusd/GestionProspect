import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOrganismeAddComponent } from './type-organisme-add.component';

describe('TypeOrganismeAddComponent', () => {
  let component: TypeOrganismeAddComponent;
  let fixture: ComponentFixture<TypeOrganismeAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeOrganismeAddComponent]
    });
    fixture = TestBed.createComponent(TypeOrganismeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
