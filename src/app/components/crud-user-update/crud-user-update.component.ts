import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crud-user-update',
  templateUrl: './crud-user-update.component.html',
  styleUrls: ['./crud-user-update.component.css']
})
export class CrudUserUpdateComponent implements OnInit {
  formsActualiza!: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CrudUserUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    this.formsActualiza = this.formBuilder.group({
      validaNombre: ['', [Validators.required]],
      validaUsuario: ['', [Validators.required]],
      validaApellido: ['', [Validators.required]],
      validaEmail: ['', [Validators.required, Validators.email]],
      validaPassword: ['', [Validators.required]],
      validaIsActive: [false],
      validaCreatedAt: [new Date()]
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.formsActualiza.patchValue({
        validaNombre: this.data.name,
        validaUsuario: this.data.username,
        validaApellido: this.data.lastname,
        validaEmail: this.data.email,
        validaPassword: this.data.password,
        validaIsActive: this.data.isActive,
        validaCreatedAt: this.data.createdAt
      });
    }
  }

  actualiza(): void {
    if (this.formsActualiza.valid) {
      const updatedUser: User = {
        ...this.data,
        ...this.formsActualiza.value,
        username: this.formsActualiza.value.validaUsuario,
        name: this.formsActualiza.value.validaNombre,
        lastname: this.formsActualiza.value.validaApellido,
        email: this.formsActualiza.value.validaEmail,
        password: this.formsActualiza.value.validaPassword,
        isActive: this.formsActualiza.value.validaIsActive,
        createdAt: this.formsActualiza.value.validaCreatedAt
      };

      this.userService.updateUser(updatedUser).subscribe({
        next: () => {
          Swal.fire('Actualizado', 'El usuario ha sido actualizado con éxito', 'success');
          this.dialogRef.close(true);
        },
        error: (error: any) => {
          Swal.fire('Error', 'Hubo un error al actualizar el usuario', 'error');
          console.error('Error al actualizar el usuario', error);
        }
      });
    } else {
      Swal.fire('Error', 'Formulario inválido', 'error');
    }
  }

  salir(): void {
    this.dialogRef.close();
  }
}
