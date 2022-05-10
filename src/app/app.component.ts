import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { User, UserColumns } from './model/user';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title: any;  
  displayedColumns: string[] = UserColumns.map((col) => col.key);
  columnsSchema: any = UserColumns;
  dataSource = new MatTableDataSource<User>();
  confirmed: any;
  isDisabled: boolean = true;
  click : boolean = true;
  columns = [" ", "ID","Title", "Completed", " "];
  index = ["isSelected", "id", "title", "completed", "isEdit"];
  users : User[] = [];

  @ViewChild('paginator')
  paginator!: MatPaginator;

  @ViewChild('focus', { static: false })
  input!: ElementRef;

  SelectedIDs:any;
  isEditing: boolean = false;
  enableEditIndex = null;
  selectedRow: any;
  count:number = 0;
  public toggleButton: boolean = true;
  checkboxes: any;
  selectedItems = [];

  constructor(public dialog: MatDialog, private userService: UserService) {}
  
  ngOnInit() {
    this.userService.getUsers().subscribe((res: any) => {
      this.dataSource.data = res;      
    });    
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  updateStatus($event){
    $event.target.checked === false ?  this.isDisabled = false: this.isDisabled = true;
  }  

  editRow(row) {
    if (row.id === 0) {
      this.userService.addUser(row).subscribe((newUser: User) => {
        row.id = newUser.id;
        row.isEdit = false;
      });
    } else {
      this.userService.updateUser(row).subscribe(() => (row.isEdit = false));
    }
  }

  addRow() {
    const newRow: User = {      
      id: '',
      title: '',
      completed: '',
      isEdit: true,
      isSelected: false,
    };
    this.dataSource.data = [newRow, ...this.dataSource.data];
  }

  removeRow(id) {
    this.dialog
      .open(ConfirmationDialogComponent)
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm) {
          this.userService.deleteUser(id).subscribe(() => {
            this.dataSource.data = this.dataSource.data.filter(
              (u: User) => u.id !== id
            );
          });
        }    
      });
  }

  removeSelectedRows() {
    this.click = !this.click;
    const users = this.dataSource.data.filter((u: User) => u.isSelected);
    this.dialog
      .open(ConfirmationDialogComponent)
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm) {
          this.userService.deleteUsers(users).subscribe(() => {
            this.dataSource.data = this.dataSource.data.filter(
              (u: User) => !u.isSelected
            );
          });
        }
      });
  }
  
  clickc(value: any) {
    console.log(value);
    this.toggleButton = false
    setTimeout(() => {
      this.input.nativeElement.focus();
      this.selectedRow = 0;
    }, 0);
  }

}