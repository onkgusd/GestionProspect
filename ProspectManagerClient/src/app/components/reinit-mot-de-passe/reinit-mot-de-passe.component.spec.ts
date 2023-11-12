import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReinitMotDePasseComponent } from './reinit-mot-de-passe.component';

describe('ReinitMotDePasseComponent', () => {
  let component: ReinitMotDePasseComponent;
  let fixture: ComponentFixture<ReinitMotDePasseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReinitMotDePasseComponent]
    });
    fixture = TestBed.createComponent(ReinitMotDePasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
