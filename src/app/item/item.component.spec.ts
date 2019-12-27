import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContatcsItemComponent } from './contatcs-item.component';

describe('ContatcsItemComponent', () => {
  let component: ContatcsItemComponent;
  let fixture: ComponentFixture<ContatcsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContatcsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContatcsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
