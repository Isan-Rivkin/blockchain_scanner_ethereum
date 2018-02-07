/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MinerMapComponent } from './miner-map.component';

describe('MinerMapComponent', () => {
  let component: MinerMapComponent;
  let fixture: ComponentFixture<MinerMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinerMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinerMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
