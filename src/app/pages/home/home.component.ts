import { Component, inject } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';
import { IResponse } from '../../interfaces/iresponse.interface';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { LucideAngularModule, ArrowRight, ArrowLeft } from 'lucide-angular';

@Component({
  selector: 'app-home',
  imports: [UserCardComponent, LucideAngularModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  icons = { ArrowLeft, ArrowRight };
  arrUsers: IUser[] = [];
  usersService = inject(UsersService);
  totalPages: number = 0;
  page: number = 1;

  ngOnInit() {
    this.loadUsers();
  }

  async loadUsers() {
    try {
      let response: IResponse = await this.usersService.getAll(this.page);
      this.arrUsers = response.results;
      this.totalPages = response.total_pages;
    } catch(error) {
      console.error(error);
    }
  }

  async prevPage() {
    if (this.page > 1) {
      this.page--;
      await this.loadUsers();
    }
  }

  async nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      await this.loadUsers();
    }
  }
}