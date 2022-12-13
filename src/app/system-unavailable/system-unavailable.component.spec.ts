import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SystemUnavailableComponent} from './system-unavailable.component';

describe('SystemUnavailableComponent', () => {
  let component: SystemUnavailableComponent;
  let fixture: ComponentFixture<SystemUnavailableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemUnavailableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemUnavailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
