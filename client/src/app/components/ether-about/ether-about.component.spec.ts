/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EtherAboutComponent } from './ether-about.component';

describe('EtherAboutComponent', () => {
  let component: EtherAboutComponent;
  let fixture: ComponentFixture<EtherAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtherAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtherAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
