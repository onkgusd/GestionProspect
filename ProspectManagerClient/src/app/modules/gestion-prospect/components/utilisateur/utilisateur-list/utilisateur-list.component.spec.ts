import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilisateurListComponent } from './utilisateur-list.component';

describe('UtilisateurListComponent', () => {
  let component: UtilisateurListComponent;
  let fixture: ComponentFixture<UtilisateurListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UtilisateurListComponent]
    });
    fixture = TestBed.createComponent(UtilisateurListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
