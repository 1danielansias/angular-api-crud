import { Component, inject, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  @Input() id: string = '';
  userForm: FormGroup = new FormGroup({}, []);
  user!: IUser;
  usersService = inject(UsersService);
  title: string = 'NUEVO USUARIO';

  async ngOnInit() {
    // si se recibe el id de usuario, llamar al servicio para obtener los datos del usuario y pintarlos
    // dentro del formulario, si no se recibe, recoger los datos del form e insertarlos mediante el servicio
    if (this.id) {
      this.title = 'EDITAR USUARIO';
      try {
        this.user = await lastValueFrom(this.usersService.getUserById(this.id));
        // gestionar error de usuario no existente aqui ya que llega como respuesta correcta
        if (!this.user._id) {
          Swal.fire({
            title: 'Usuario no encontrado',
            text: 'El usuario que intentas editar no existe.',
            icon: 'error',
            confirmButtonColor: '#3085d6',
          });
        }
      } catch (error) {
        console.log(error);
      }
    }

    this.userForm = new FormGroup(
      {
        _id: new FormControl(this.id || null, []),
        first_name: new FormControl(this.user?.first_name || '', []),
        last_name: new FormControl(this.user?.last_name || '', []),
        email: new FormControl(this.user?.email || '', []),
        image: new FormControl(this.user?.image || '', []),
      },
      []
    );
  }

  getDataForm() {
    // recoger los datos del formulario
    console.log(this.userForm.value);
    if(this.userForm.value._id) {
      // actualizar usuario
    } else {
      // crear usuario
    }
  }
}
