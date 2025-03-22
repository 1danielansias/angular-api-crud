import { Component, inject, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';
import {
  LucideAngularModule,
  Eye,
  Pencil,
  Trash2,
  ArrowLeft,
} from 'lucide-angular';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-view',
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css',
})
export class UserViewComponent {
  icons = { Eye, Pencil, Trash2, ArrowLeft };

  @Input() id: string = ''; // Recibir el ID del usuario a visualizar (input binding)
  user!: IUser;
  usersService = inject(UsersService);
  router = inject(Router);

  async ngOnInit() {
    // Llamar al método del servicio para obtener un usuario por ID
    this.usersService.getUserById(this.id).subscribe(
      (data: IUser) => {
        this.user = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteUser() {
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
        this.usersService.delete(this.id).subscribe((data) => {
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

        this.router.navigate(['/home']);
      }
    });
  }
}
