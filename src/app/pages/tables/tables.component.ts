import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { HttpClientModule } from '@angular/common/http';
import { TablesService } from '@services/tables/tables.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { catchError, exhaustMap, Observable, tap } from 'rxjs';

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
    this.getTableInfo().subscribe();
  }

  getTableInfo(): Observable<any> {
    return this.tableService.getTables().pipe(
      tap((tables: any[]) => {
        this.tables = (tables as any[]).sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      })
    );
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
        this.tableService
          .payTableBill(table.id)
          .pipe(
            tap(_ => {
              // remove current order after bill is paid
              localStorage.removeItem('current-order-table-' + table.id);
              this.messageService.add({
                severity: 'info',
                summary: 'Confirmed',
                detail: 'You have paid the table bill.',
                life: 3000,
              });
            }),
            catchError(err => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error while paying the bill.',
                life: 3000,
              });
              return err;
            }),
            exhaustMap(_ => this.getTableInfo())
          )
          .subscribe();
      },
    });
  }
}
