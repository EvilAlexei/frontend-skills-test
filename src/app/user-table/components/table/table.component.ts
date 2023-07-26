import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit {
  users$: Observable<User[]> = new Observable();
  sum = 0;

  constructor(
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.users$ = this.userService.getUsers()
      .pipe(
        tap(
          users => this.sum = users.reduce((acc, item) => acc + item.score, 0)
        )
      );
  }

  removeUser(user: User): void {
    if (user.id) {
      this.userService.removeUser(user.id);
    }
  }

  trackByGn(index: number): number {
    return index;
  }
}
