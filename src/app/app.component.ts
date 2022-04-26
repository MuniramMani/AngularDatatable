import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { User, UserColumns } from './model/user';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: any;  
  displayedColumns: string[] = UserColumns.map((col) => col.key);
  columnsSchema: any = UserColumns;
  dataSource = new MatTableDataSource<User>();

  constructor(public dialog: MatDialog, private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((res: any) => {
      this.dataSource.data = res;
    });
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
      // email: '',
      // birthDate: '',
      isEdit: true,
      isSelected: false,
    };
    this.dataSource.data = [newRow, ...this.dataSource.data];
  }

  removeRow(id) {
    this.userService.deleteUser(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(
        (u: User) => u.id !== id
      );
    });
  }

  removeSelectedRows() {
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

}
