export type EstadoCDT =
  | 'apertura'
  | 'en-curso'
  | 'finalizado'
  | 'liquidado'
  | 'cancelado';

export type CDTCalc = {
  inversion: number;
  interes: number;
  retencion: number;
  duracion: number;
  fechaInicio: string;
  fechaFin: string;
  montoInteres: number;
  montoGanancia: number;
  montoRetencion: number;
  montoDevolucion: number;
}

export type CDT = CDTCalc & {
  id: number;
  cuenta: number;
  liquidado: boolean;
  cancelado: boolean;
  estado: EstadoCDT;
};
