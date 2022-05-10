import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { UserService } from './services/user.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let service: UserService;
  let spy: any;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents(); 
    TestBed.configureTestingModule({ providers: [UserService] });     
  }); 

    it('should use ValueService', () => {
      service = TestBed.inject(UserService);
      expect(service.getValue()).toBe('real value');
    });

  it('needs returns true when the user has not been update data', () => {
    const newLocal = false;
    spy = spyOn(service, 'getUsers');
    expect(component.ngOnInit()).toBeTruthy();
    expect(service.getUsers).toHaveBeenCalled();

  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-table'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-table');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('angular-table app is running!');
  });
});
