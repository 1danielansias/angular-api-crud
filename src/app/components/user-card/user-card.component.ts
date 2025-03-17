import { Component, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { LucideAngularModule, Eye, Pencil, Trash2 } from 'lucide-angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-card',
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
})
export class UserCardComponent {
  @Input() user!: IUser;
  icons = { Eye, Pencil, Trash2 };
}
