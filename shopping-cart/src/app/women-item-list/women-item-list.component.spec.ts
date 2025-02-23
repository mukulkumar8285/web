import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WomenItemListComponent } from './women-item-list.component';

describe('WomenItemListComponent', () => {
  let component: WomenItemListComponent;
  let fixture: ComponentFixture<WomenItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WomenItemListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WomenItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
