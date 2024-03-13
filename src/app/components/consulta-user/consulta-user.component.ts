import { MatPaginator } from '@angular/material/paginator';
import { Component, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-consulta-user',
  templateUrl: './consulta-user.component.html',
  styleUrls: ['./consulta-user.component.css']
})
export class ConsultaUserComponent {

  dataSource: MatTableDataSource<User>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  displayedColumns = ["id", "username", "name", "lastname", "email", "createdAt"];
  categoryId: number = 0;
  constructor(private userService: UserService) {

    this.dataSource = new MatTableDataSource<User>([]);
  }

  consulta() {

    if (this.categoryId > 0) {
      this.userService.getUsersByCategory(this.categoryId).subscribe(
        users => {
          this.dataSource.data = users;
          this.dataSource.paginator = this.paginator;
        }
      );
    } else {

    }
  }
}
