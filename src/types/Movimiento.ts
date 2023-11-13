export type TipoMovimiento =
  | 'carga-cuenta'
  | 'descarga-cuenta'
  | 'carga-bolsillo'
  | 'descarga-bolsillo'
  | 'inversion-cdt'
  | 'liquidacion-cdt'
  | 'cancelacion-cdt';

export type Movimiento = {
  id: number;
  tipo: TipoMovimiento;
  fecha: string;
  monto: number;
};

export type DescargaCuenta = Movimiento & {
  entidadDestino: string;
  cuentaDestino: string;
};
