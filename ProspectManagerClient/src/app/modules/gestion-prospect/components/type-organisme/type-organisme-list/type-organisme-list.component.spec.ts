import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOrganismeListComponent } from './type-organisme-list.component';

describe('TypeOrganismeListComponent', () => {
  let component: TypeOrganismeListComponent;
  let fixture: ComponentFixture<TypeOrganismeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeOrganismeListComponent]
    });
    fixture = TestBed.createComponent(TypeOrganismeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

