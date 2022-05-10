import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpolyeeTableComponent } from './empolyee-table.component';

describe('EmpolyeeTableComponent', () => {
  let component: EmpolyeeTableComponent;
  let fixture: ComponentFixture<EmpolyeeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpolyeeTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpolyeeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
