import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioLsComponent } from './usuario-ls.component';

describe('UsuarioLsComponent', () => {
  let component: UsuarioLsComponent;
  let fixture: ComponentFixture<UsuarioLsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioLsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioLsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
