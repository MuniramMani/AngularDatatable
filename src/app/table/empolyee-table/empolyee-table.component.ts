import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { Product } from '../../model/user';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
//import 'rxjs/add/operator/map';

@Component({
  selector: 'app-empolyee-table',
  templateUrl: './empolyee-table.component.html',
  styleUrls: ['./empolyee-table.component.scss']
})
export class EmpolyeeTableComponent implements OnInit {
  msg: string = ''; 
  clss: string = ''; 
  products: Product[] = [];
  pager: any = {};
  allItems: any;
  enableEditIndex = null;
  isEditing: boolean = false;
  public toggleButton: boolean = true;

  @ViewChild('myfocus', { static: false })
  input!: ElementRef;
  selectedRow: any;
  
  constructor(public dialog: MatDialog, private userService: UserService,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts(): void {
		this.userService.getProducts().subscribe((response: any) => {
      this.products = response;
      this.allItems = response;
      this.setPage(1);
	  });
  }

  checkAllCheckBox(ev: any) {
		this.products.forEach(x => x.checked = ev.target.checked)
	}

  isAllCheckBoxChecked() {
		return this.products.every(item => item.checked);
	}

  clickc(value: any) {
    console.log(value);
    this.toggleButton = false
    setTimeout(() => {
      this.input.nativeElement.focus();
      this.selectedRow = 0;
    }, 0);
  }

  deleteProducts(): void {		
    const product: any = this.products.filter(user => user.checked).map(item => item.id);
    this.dialog
      .open(ConfirmationDialogComponent)
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm) {
          this.userService.deleteProducts(product).subscribe(() => {
            this.products = this.products.filter(
              (user: Product) => !user.checked
            );
          });
        }
      });
  }
  
  setPage(page: number) {
    this.pager = this.userService.getPager(this.allItems.length, page);
    this.products = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  deleteRow(item){
    const index = this.products.indexOf(item);
    this.dialog
      .open(ConfirmationDialogComponent)
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm) {
          this.userService.deleteProduct(item).subscribe(() => {
            this.products.splice(index, 1);
          });
        }    
      });    
  }

  save(products: Product) {
    if (products.id === 0) {
      this.userService.addProduct(products).subscribe((newUser: Product) => {
        products.id = newUser.id;
        products.isEdit = false;
      });
    } else {
      this.userService.updateProduct(products).subscribe(() => (products.isEdit = false));
    }

    console.log("test 1", products);    
    this.isEditing = false;
    this.enableEditIndex = null;
    this.userService.updateProduct(products).subscribe(() => (products.isEdit = false));
    console.log("test 1", products.isEdit);    
  }

  switchEditMode(i) {
    this.isEditing = true;
    this.enableEditIndex = i;
  }
  
  addRowTable() {
    const newRow: Product = {      
      id: 0,
      title: '',
      completed: '',
      isEdit: true,
      isSelected: false,
    };
    this.products = [newRow, ...this.products];
  }

  clickItem(value: any) {
    console.log(value);
    this.toggleButton = false
    setTimeout(() => {
      this.input.nativeElement.focus();
      this.selectedRow = 0;
    }, 0);
  }   

}