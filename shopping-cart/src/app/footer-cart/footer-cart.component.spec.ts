import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterCartComponent } from './footer-cart.component';

describe('FooterCartComponent', () => {
  let component: FooterCartComponent;
  let fixture: ComponentFixture<FooterCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterCartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
