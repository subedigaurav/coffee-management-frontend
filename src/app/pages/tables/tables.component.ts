import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { HttpClientModule } from '@angular/common/http';
import { TablesService } from '@services/tables/tables.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [CommonModule, CardModule, HttpClientModule, ButtonModule],
  providers: [TablesService],
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.css',
})
export class TablesComponent implements OnInit {
  public tables: any[] = [];

  constructor(
    private tableService: TablesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.tableService.getTables().subscribe((tables: any[]) => {
      this.tables = tables as any[];
    });
  }

  goToHomeView(id: number) {
    this.router.navigate(['table', id]).then();
  }
}
