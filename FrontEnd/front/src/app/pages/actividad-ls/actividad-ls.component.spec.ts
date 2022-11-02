import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadLsComponent } from './actividad-ls.component';

describe('ActividadLsComponent', () => {
  let component: ActividadLsComponent;
  let fixture: ComponentFixture<ActividadLsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActividadLsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadLsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
