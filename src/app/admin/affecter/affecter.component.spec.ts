import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffecterComponent } from './affecter.component';

describe('AffecterComponent', () => {
  let component: AffecterComponent;
  let fixture: ComponentFixture<AffecterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffecterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffecterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
