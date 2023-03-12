import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsMetricsComponent } from './patients-metrics.component';

describe('PatientsMetricsComponent', () => {
  let component: PatientsMetricsComponent;
  let fixture: ComponentFixture<PatientsMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientsMetricsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientsMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
