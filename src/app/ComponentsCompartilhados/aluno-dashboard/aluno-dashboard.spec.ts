import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunoDashboard } from './aluno-dashboard';

describe('AlunoDashboard', () => {
  let component: AlunoDashboard;
  let fixture: ComponentFixture<AlunoDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlunoDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlunoDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
