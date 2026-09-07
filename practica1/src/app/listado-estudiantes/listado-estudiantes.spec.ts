import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoEstudiantes } from './listado-estudiantes';

describe('ListadoEstudiantes', () => {
  let component: ListadoEstudiantes;
  let fixture: ComponentFixture<ListadoEstudiantes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoEstudiantes],
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoEstudiantes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
