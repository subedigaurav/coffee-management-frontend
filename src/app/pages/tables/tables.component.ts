import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { HttpClientModule } from '@angular/common/http';
import { TablesService } from '@services/tables/tables.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    HttpClientModule,
    ButtonModule,
    ConfirmDialogModule,
  ],
  providers: [TablesService, ConfirmationService, MessageService],
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.css',
})
export class TablesComponent implements OnInit {
  public tables: any[] = [];

  constructor(
    private tableService: TablesService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.tableService.getTables().subscribe((tables: any[]) => {
      this.tables = tables as any[];
    });
  }

  goToHomeView(id: number) {
    this.router.navigate(['table', id]).then();
  }

  onTableSelect(table: any) {
    if (table.status === 'vacant') this.goToHomeView(table.id);
    else this.openConfirmationDialog(table);
  }

  openConfirmationDialog(table: any) {
    this.confirmationService.confirm({
      header: 'Are you sure to pay the bill?',
      message: `You have bill of ${table.table_amount} Please confirm to proceed.`,
      accept: () => {
        this.tableService.payTableBill(table.id).subscribe(res => {
          this.messageService.add({
            severity: 'info',
            summary: 'Confirmed',
            detail: 'You have accepted',
            life: 3000,
          });
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
          life: 3000,
        });
      },
    });
  }
}
