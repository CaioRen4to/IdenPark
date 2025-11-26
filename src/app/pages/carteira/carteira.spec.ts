import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Carteira } from './carteira';

describe('Carteira', () => {
  let component: Carteira;
  let fixture: ComponentFixture<Carteira>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Carteira]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Carteira);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
