import { Component, inject } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';
import { IResponse } from '../../interfaces/iresponse.interface';
import { UserCardComponent } from '../../components/user-card/user-card.component';

@Component({
  selector: 'app-home',
  imports: [UserCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  arrUsers: IUser[] = [];
  usersService = inject(UsersService);

  async ngOnInit() {
    this.usersService.getAll().subscribe(
      (data: IResponse) => {
        this.arrUsers = data.results;
        console.log(this.arrUsers);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
