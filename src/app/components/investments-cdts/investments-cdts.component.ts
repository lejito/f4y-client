import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CDTsService } from 'src/app/services/cdts.service';
import { UtilsService } from 'src/app/services/utils.service';
import { CDT } from 'src/types/CDT';

@Component({
  selector: 'app-investments-cdts',
  templateUrl: './investments-cdts.component.html',
  styleUrls: ['./investments-cdts.component.css'],
})
export class InvestmentsCdtsComponent implements OnInit, OnDestroy {
  constructor(
    public utilsService: UtilsService,
    private cdtsService: CDTsService
  ) {}

  public cdts: CDT[] = [];
  public filtrado: boolean = false;
  private subscription = new Subscription();

  async ngOnInit(): Promise<void> {
    this.subscription = this.utilsService
      .obtenerFiltradoCDTs()
      .subscribe((filtradoCDTs) => {
        this.filtrado = filtradoCDTs;
      });
    await this.cargarDatos();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private async cargarDatos(): Promise<void> {
    this.utilsService.isLoading = true;
    await this.obtenerCDTs();
    this.filtrar();
    this.utilsService.isLoading = false;
  }

  private async obtenerCDTs(): Promise<void> {
    const cdts = await this.cdtsService.obtenerTodos();
    if (cdts !== null) {
      this.cdts = cdts;
    }
  }

  public async filtradoCDTs(): Promise<void> {
    this.utilsService.actualizarFiltradoCDTs(!this.filtrado);
    await this.cargarDatos();
  }

  private filtrar(): void {
    if (this.filtrado) {
      this.cdts = this.cdts.filter((cdt) => {
        return cdt.estado !== 'liquidado' && cdt.estado !== 'cancelado';
      });
    }
  }
}
