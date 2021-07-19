import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DettaglioViaggiComponent } from './dettaglio-viaggi.component';

describe('DettaglioViaggiComponent', () => {
  let component: DettaglioViaggiComponent;
  let fixture: ComponentFixture<DettaglioViaggiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DettaglioViaggiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DettaglioViaggiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
