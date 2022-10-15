import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllarticlesComponent } from './allarticles.component';

describe('AllarticlesComponent', () => {
  let component: AllarticlesComponent;
  let fixture: ComponentFixture<AllarticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllarticlesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllarticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
