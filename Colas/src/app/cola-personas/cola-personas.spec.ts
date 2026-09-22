import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaPersonas } from './cola-personas';

describe('ColaPersonas', () => {
  let component: ColaPersonas;
  let fixture: ComponentFixture<ColaPersonas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColaPersonas],
    }).compileComponents();

    fixture = TestBed.createComponent(ColaPersonas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
