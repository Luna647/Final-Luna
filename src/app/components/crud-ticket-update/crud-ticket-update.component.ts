import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { Category } from 'src/app/models/category.model';
import { Kind } from 'src/app/models/kind.model';
import { Priority } from 'src/app/models/priority.model';
import { Project } from 'src/app/models/project.model';
import { Status } from 'src/app/models/status.model';
import { Ticket } from 'src/app/models/ticket.model';
import { User } from 'src/app/models/user.model';
import { CategoryService } from 'src/app/services/category.service';
import { KindService } from 'src/app/services/kind.service';
import { PriorityService } from 'src/app/services/priority.service';
import { ProjectService } from 'src/app/services/project.service';
import { StatusService } from 'src/app/services/status.service';
import { TicketService } from 'src/app/services/ticket.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-crud-ticket-update',
  templateUrl: './crud-ticket-update.component.html',
  styleUrls: ['./crud-ticket-update.component.css']
})
export class CrudTicketUpdateComponent implements OnInit {

  tipos: Kind[] = [];
  usuarios: User[] = [];
  projectos: Project[] = [];
  categorias: Category[] = [];
  prioridades: Priority[] = [];
  estados: Status[] = [];
  ticket: Ticket = {
    id: 0,
    title: "",
    description: "",
    updatedAt: new Date(),
    createdAt: new Date(),
    kind: new Kind(),
    user: new User(),
    project: new Project(),
    category: new Category(),
    priority: new Priority(),
    status: new Status()
  };

  constructor(
    private categoryService: CategoryService,
    private kindService: KindService,
    private priorityService: PriorityService,
    private projectService: ProjectService,
    private statusService: StatusService,
    private ticketService: TicketService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CrudTicketUpdateComponent>
  ) { }

  formsActualiza = this.formBuilder.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    updatedAt: ['', [Validators.required]],
    createdAt: ['', [Validators.required]],
    validaTipo: ['', [Validators.required]],
    validaUsuario: ['', [Validators.required]],
    validaProjecto: ['', [Validators.required]],
    validaCategoria: ['', [Validators.required]],
    validaPrioridad: ['', [Validators.required]],
    validaEstado: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.cargarCategory();
    this.cargarKind();
    this.cargarPriority();
    this.cargarProject();
    this.cargarStatus();
    this.cargarUser();
  }


  cargarCategory(): void {
    this.categoryService.listarCategoria().subscribe(data => {
      this.categorias = data;
    });
  }

  cargarKind(): void {
    this.kindService.listarTipo().subscribe(data => {
      this.tipos = data;
    });
  }

  cargarPriority(): void {
    this.priorityService.listarPrioridad().subscribe(data => {
      this.prioridades = data;
    });
  }

  cargarProject(): void {
    this.projectService.listarProject().subscribe(data => {
      this.projectos = data;
    });
  }

  cargarStatus(): void {
    this.statusService.listarStatus().subscribe(data => {
      this.estados = data;
    });
  }

  cargarUser(): void {
    this.userService.getUsers().subscribe(data => {
      this.usuarios = data;
    });
  }

  onCategoryChange(id: number): void {
    if (!this.ticket.category) {
      this.ticket.category = new Category();
    }
    this.ticket.category.id = id;
  }

  onKindChange(id: number): void {
    if (!this.ticket.kind) {
      this.ticket.kind = new Kind();
    }
    this.ticket.kind.id = id;
  }

  onPriorityChange(id: number): void {
    if (!this.ticket.priority) {
      this.ticket.priority = new Priority();
    }
    this.ticket.priority.id = id;
  }

  onProjectChange(id: number): void {
    if (!this.ticket.project) {
      this.ticket.project = new Project();
    }
    this.ticket.project.id = id;
  }

  onStatusChange(id: number): void {
    if (!this.ticket.status) {
      this.ticket.status = new Status();
    }
    this.ticket.status.id = id;
  }

  onUserChange(id: number): void {
    if (!this.ticket.user) {
      this.ticket.user = new User();
    }
    this.ticket.user.id = id;
  }

actualiza(): void {
  if (this.formsActualiza.valid) {
    this.ticketService.updateTicket(this.ticket).subscribe(
      () => {
        Swal.fire({
          title: 'Mensaje',
          text: 'Ticket actualizado correctamente.',
          icon: 'success',
        }).then((result) => {
          if (result.value) {
            this.dialogRef.close(1);
          }
        });
      },
      error => {
        if (error.error && error.error.mensaje) {
          Swal.fire('Error', error.error.mensaje, 'error');
        } else {
          Swal.fire('Error', 'Ocurrió un error al actualizar el ticket.', 'error');
        }
      }
    );
  } else {
    Swal.fire('Validación', 'Complete los campos requeridos.', 'warning');
  }
}

  salir(): void {
    this.dialogRef.close();
  }
}
