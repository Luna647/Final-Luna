import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Ticket } from 'src/app/models/ticket.model';
import { TicketService } from 'src/app/services/ticket.service';
import Swal from 'sweetalert2';
import { CrudTicketAddComponent } from '../crud-ticket-add/crud-ticket-add.component';
import { CrudTicketUpdateComponent } from '../crud-ticket-update/crud-ticket-update.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-crud-ticket',
  templateUrl: './crud-ticket.component.html',
  styleUrls: ['./crud-ticket.component.css']
})
export class CrudTicketComponent implements OnInit {
  filtro: string = '';
  dataSource: MatTableDataSource<Ticket> = new MatTableDataSource<Ticket>();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  displayedColumns: string[] = ['id', 'title', 'description', 'updatedAt', 'createdAt', 'kind', 'user', 'project', 'category','priority', 'status','acciones'];
  constructor(
    private ticketService: TicketService,
    public dialog: MatDialog
  ) {}


  ngOnInit(): void {
    this.refreshTable();
  }

  refreshTable(): void {
    this.ticketService.getTicket().subscribe({
      next: (data: Ticket[]) => {
        data.forEach(ticket => {
          ticket.title = ticket.title || ''; // Asegura que la propiedad title esté definida
          ticket.description = ticket.description || ''; // Asegura que la propiedad description esté definida
        });
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error: any) => {
        Swal.fire('Error', 'Hubo un problema al cargar los tickets.', 'error');
        console.error('Error al cargar los tickets: ', error);
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
    const dialogRef = this.dialog.open(CrudTicketAddComponent, {
      width: '400px', // Ancho del modal
      maxHeight: '90vh' // Altura máxima del modal
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.refreshTable();
      }
    });
  }

  openEditDialog(ticket: Ticket): void {
    const dialogRef = this.dialog.open(CrudTicketUpdateComponent, {
      width: '400px', // Ancho del modal
      maxHeight: '90vh', // Altura máxima del modal
      data: ticket
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
        this.ticketService.deleteTicket(id).subscribe({
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
