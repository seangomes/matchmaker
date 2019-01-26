import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalChatMessageComponent } from './personal-chat-message.component';

describe('PersonalChatMessageComponent', () => {
  let component: PersonalChatMessageComponent;
  let fixture: ComponentFixture<PersonalChatMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalChatMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalChatMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
