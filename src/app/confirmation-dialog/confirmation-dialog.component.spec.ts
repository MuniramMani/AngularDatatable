import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from '../services/user.service';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;
  let service: UserService;
  let spy: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationDialogComponent ]
    })
    .compileComponents();
    TestBed.configureTestingModule({ providers: [UserService] });  
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should use ValueService', () => {
    service = TestBed.inject(UserService);
    expect(service.getValue()).toBe('real value');
  });

  it('needs returns true when the user deletd on data', () => {
    const newLocal = false;
    spy = spyOn(service, 'getUsers');
    expect(component.ngOnInit()).toBeTruthy();
    expect(service.getUsers).toHaveBeenCalled();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
