import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToparticlesComponent } from './toparticles.component';

describe('ToparticlesComponent', () => {
  let component: ToparticlesComponent;
  let fixture: ComponentFixture<ToparticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToparticlesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToparticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
