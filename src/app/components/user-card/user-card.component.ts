import { Component, inject, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { LucideAngularModule, Eye, Pencil, Trash2 } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-card',
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
})
export class UserCardComponent {
  @Input() user!: IUser;
  icons = { Eye, Pencil, Trash2 };
  usersService = inject(UsersService);

  deleteUser(id: string) {
    console.log('Borrar usuario: ' + id);
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#262626',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Llamar al método del servicio para eliminar un usuario por ID
        this.usersService.delete(id).subscribe((data) => {
          if (data._id) {
            Swal.fire({
              title: 'Eliminado',
              text: 'El usuario ha sido eliminado.',
              icon: 'success',
              confirmButtonColor: '#3085d6',
            });
          } else {
            Swal.fire({
              title: 'Error',
              text: 'No se pudo eliminar el usuario.',
              icon: 'error',
              confirmButtonColor: '#262626',
            });
          }
        });
      }
    });
  }
}
