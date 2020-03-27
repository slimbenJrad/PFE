import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashparentComponent } from './dashparent.component';

describe('DashparentComponent', () => {
  let component: DashparentComponent;
  let fixture: ComponentFixture<DashparentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashparentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashparentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
