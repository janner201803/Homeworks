import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarLibro } from './listar-libro';

describe('ListarLibro', () => {
  let component: ListarLibro;
  let fixture: ComponentFixture<ListarLibro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarLibro],
    }).compileComponents();

    fixture = TestBed.createComponent(ListarLibro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
