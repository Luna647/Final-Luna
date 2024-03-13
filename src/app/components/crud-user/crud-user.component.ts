import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { CrudUserAddComponent } from '../crud-user-add/crud-user-add.component';
import { CrudUserUpdateComponent } from '../crud-user-update/crud-user-update.component';

@Component({
  selector: 'app-crud-user',
  templateUrl: './crud-user.component.html',
  styleUrls: ['./crud-user.component.css']
})
export class CrudUserComponent implements OnInit {
  filtro: string = '';
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  displayedColumns: string[] = ['id', 'username', 'name', 'lastname', 'email', 'isActive', 'createdAt', 'kind', 'acciones'];

  constructor(
    private userService: UserService,
    public dialog: MatDialog
  ) {}


  ngOnInit(): void {
    this.refreshTable();
  }

  refreshTable(): void {
    this.userService.getUsers().subscribe({
      next: (data: User[]) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error: any) => {
        Swal.fire('Error', 'Hubo un problema al cargar los usuarios.', 'error');
        console.error('Error al cargar los usuarios: ', error);
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilterByButton(): void {
    this.dataSource.filter = this.filtro.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(CrudUserAddComponent, {
      width: '400px', // Ancho del modal
      maxHeight: '90vh' // Altura máxima del modal
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.refreshTable();
      }
    });
  }

  openEditDialog(user: User): void {
    const dialogRef = this.dialog.open(CrudUserUpdateComponent, {
      width: '400px', // Ancho del modal
      maxHeight: '90vh', // Altura máxima del modal
      data: user
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.refreshTable();
      }
    });
  }

  deleteUser(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe({
          next: () => {
            this.refreshTable();
            Swal.fire('Eliminado', 'El usuario ha sido eliminado.', 'success');
          },
          error: (error: any) => {
            Swal.fire('Error', 'Hubo un problema al eliminar el usuario.', 'error');
            console.error('Error al eliminar el usuario: ', error);
          }
        });
      }
    });
  }
}
