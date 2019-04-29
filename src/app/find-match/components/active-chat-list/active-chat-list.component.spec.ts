import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveChatListComponent } from './active-chat-list.component';

describe('ActiveChatListComponent', () => {
  let component: ActiveChatListComponent;
  let fixture: ComponentFixture<ActiveChatListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveChatListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveChatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
