import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectAddComponent } from './prospect-add.component';

describe('ProspectAddComponent', () => {
  let component: ProspectAddComponent;
  let fixture: ComponentFixture<ProspectAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProspectAddComponent]
    });
    fixture = TestBed.createComponent(ProspectAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
