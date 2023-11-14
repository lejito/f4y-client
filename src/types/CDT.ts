export type EstadoCDT =
  | 'apertura'
  | 'en-curso'
  | 'finalizado'
  | 'liquidado'
  | 'cancelado';

export type CDT = {
  id: number;
  cuenta: number;
  inversion: number;
  interes: number;
  retencion: number;
  duracion: number;
  fechaInicio: string;
  fechaFin: string;
  liquidado: boolean;
  cancelado: boolean;
  montoInteres: number;
  montoGanancia: number;
  montoRetencion: number;
  montoDevolucion: number;
  estado: EstadoCDT;
};
