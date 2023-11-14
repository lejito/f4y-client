import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CDTsService } from 'src/app/services/cdts.service';
import { UtilsService } from 'src/app/services/utils.service';
import { CDT } from 'src/types/CDT';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.css'],
})
export class InvestmentsComponent implements OnInit {
  constructor(
    private title: Title,
    public utilsService: UtilsService,
    private cdtsService: CDTsService
  ) {
    this.title.setTitle('Fin4Youth: Inversiones');
  }

  public cdts: CDT[] = [];

  async ngOnInit(): Promise<void> {
    await this.cargarDatos();
  }

  public async cargarDatos(): Promise<void> {
    this.utilsService.isLoading = true;
    await this.obtenerCDTs();
    this.utilsService.isLoading = false;
  }

  private async obtenerCDTs(): Promise<void> {
    const cdts = await this.cdtsService.obtenerTodos();
    if (cdts !== null) {
      this.cdts = cdts;
    }
  }
}
