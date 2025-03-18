import { Component, inject, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-view',
  imports: [],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css',
})
export class UserViewComponent {
  @Input() id: string = ''; // Recibir el ID del usuario a visualizar (input binding)
  user!: IUser;
  usersService = inject(UsersService);

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
}
