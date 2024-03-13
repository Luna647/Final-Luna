import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { Kind } from 'src/app/models/kind.model'; // Asegúrate de que este modelo existe y está correctamente importado

@Component({
  selector: 'app-crud-user-add',
  templateUrl: './crud-user-add.component.html',
  styleUrls: ['./crud-user-add.component.css']
})
export class CrudUserAddComponent implements OnInit {
  formsRegistra: FormGroup;
  kinds: Kind[] = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'User' }
    // Continúa con la lista de tipos de usuario según necesites
  ];

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CrudUserAddComponent>
  )


  {
    // Inicializa el FormGroup aquí para evitar el error de objeto posiblemente 'null'
    this.formsRegistra = this.formBuilder.group({
      name: ['', [Validators.required]], // Changed from validaNombre to name
      username: ['', [Validators.required]], // Changed from validaNombre to name
      lastname: ['', [Validators.required]], // Changed from validaApellido to lastname
      email: ['', [Validators.required, Validators.email]], // Changed from validaEmail to email
      password: ['', [Validators.required]], // Changed from validaPassword to password
      isActive: [false], // Changed from validaIsActive to isActive, removed unnecessary Validators.required
      kind: ['', [Validators.required]], // Changed from validaKind to kind
      createdAt: ['', [Validators.required]] // Changed from validaCreatedAt to createdAt
    });
  }


  ngOnInit(): void {
  }



  registra(): void {
    if (this.formsRegistra.valid) {
      // Utiliza el operador de encadenamiento opcional para asegurarte de que el objeto no es nulo
      const formValue = this.formsRegistra.value;
      const isActiveValue = formValue.isActive ? 1 : 0;
      const kindValue = this.formsRegistra.get('kind')?.value;
      const createdAtValue = this.formsRegistra.get('createdAt')?.value;

      // Prepara el objeto newUser con valores seguros, incluyendo conversión de tipos si es necesario
      const newUser = {
        ...formValue,
      isActive: isActiveValue,  // Usar el valor convertido para isActive
      kind: parseInt(formValue.kind, 10),  // Asegúrese de que 'kind' es un número
      createdAt: formValue.createdAt ? new Date(formValue.createdAt).toISOString() : new Date().toISOString()
    };

      this.userService.addUser(newUser).subscribe({
        next: (response: any) => {
          Swal.fire('¡Registrado!', 'El usuario ha sido registrado exitosamente.', 'success');
          this.dialogRef.close(true);
        },
        error: (error: any) => {
          console.error('Error al registrar el usuario', error);
          Swal.fire('Error', 'Hubo un problema al registrar el usuario.', 'error');
        }
      });
    } else {
      Swal.fire('Validación', 'Complete los campos requeridos.', 'warning');
    }
  }

  salir(): void {
    this.dialogRef.close();
  }
}
