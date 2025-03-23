import { Component, inject, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  @Input() id: string = '';
  // Inicializar formgroup vacio para evitar problemas con la carga de datos
  userForm: FormGroup = new FormGroup(
    {
      _id: new FormControl('', []),
      first_name: new FormControl('', []),
      last_name: new FormControl('', []),
      email: new FormControl('', []),
      image: new FormControl('', []),
    },
    []
  );
  user!: IUser;
  usersService = inject(UsersService);
  router = inject(Router);
  title: string = 'NUEVO USUARIO';

  async ngOnInit() {
    // si se recibe el id de usuario, llamar al servicio para obtener los datos del usuario y pintarlos
    // dentro del formulario, si no se recibe, recoger los datos del form e insertarlos mediante el servicio
    if (this.id) {
      this.title = 'EDITAR USUARIO';
      try {
        this.user = await this.usersService.getUserById(this.id);
        // gestionar error de usuario no existente aqui ya que llega como respuesta correcta
        if (!this.user._id) {
          Swal.fire({
            title: 'Usuario no encontrado',
            text: 'El usuario que intentas editar no existe.',
            icon: 'error',
            confirmButtonColor: '#3085d6',
          });
          this.router.navigate(['/home']);
        }
      } catch (error) {
        console.log(error);
      }
    }

    // Rellenar formulario con los datos del usuario
    this.userForm = new FormGroup(
      {
        _id: new FormControl(this.id, []),
        first_name: new FormControl(this.user?.first_name, [Validators.required]),
        last_name: new FormControl(this.user?.last_name, [Validators.required]),
        email: new FormControl(this.user?.email, [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
        image: new FormControl(this.user?.image, [Validators.required]),
      },
      []
    );
  }

  async getDataForm() {
    let response: IUser;
    try {
      if (this.userForm.value._id) {
        // Actualizar
        response = await this.usersService.update(this.userForm.value);
        console.log(response);
      } else {
        // Insertar
        response = await this.usersService.insert(this.userForm.value);
        console.log(response);
      }
      if (response.id) {
        Swal.fire({
          title: 'Usuario guardado',
          text: 'El usuario se ha guardado correctamente.',
          icon: 'success',
          confirmButtonColor: '#3085d6',
        });
        this.router.navigate(['/home']);
      } else {
        Swal.fire({
          title: 'Error al guardar',
          text: 'Ha ocurrido un error al guardar el usuario.',
          icon: 'error',
          confirmButtonColor: '#3085d6',
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  checkControl(controlName: string, errorName: string): boolean | undefined {
    return this.userForm.get(controlName)?.hasError(errorName) && this.userForm.get(controlName)?.touched; 
  }
}
