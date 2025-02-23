import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenItemListComponent } from './men-item-list.component';

describe('MenItemListComponent', () => {
  let component: MenItemListComponent;
  let fixture: ComponentFixture<MenItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenItemListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
