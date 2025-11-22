import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleItemFormComponent } from './sales-item-form';

describe('SalesItemForm', () => {
  let component: SaleItemFormComponent;
  let fixture: ComponentFixture<SaleItemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaleItemFormComponent]
    })
    .compileComponents(); 

    fixture = TestBed.createComponent(SaleItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
