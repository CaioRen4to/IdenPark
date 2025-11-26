import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCarteira } from './dashboard-carteira';

describe('DashboardCarteira', () => {
  let component: DashboardCarteira;
  let fixture: ComponentFixture<DashboardCarteira>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardCarteira]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCarteira);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
