import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilisateurFormComponent } from './utilisateur-form.component';

describe('UtilisateurFormComponent', () => {
  let component: UtilisateurFormComponent;
  let fixture: ComponentFixture<UtilisateurFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UtilisateurFormComponent]
    });
    fixture = TestBed.createComponent(UtilisateurFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
