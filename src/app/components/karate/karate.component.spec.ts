import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KarateComponent } from './karate.component';

describe('KarateComponent', () => {
  let component: KarateComponent;
  let fixture: ComponentFixture<KarateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KarateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KarateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
