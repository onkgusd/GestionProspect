import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectSearchComponent } from './prospect-search.component';

describe('ProspectSearchComponent', () => {
  let component: ProspectSearchComponent;
  let fixture: ComponentFixture<ProspectSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProspectSearchComponent]
    });
    fixture = TestBed.createComponent(ProspectSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
