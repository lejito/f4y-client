import { Router } from '@angular/router';
import { UtilsService } from '@services/utils.service';
import { BehaviorSubject, firstValueFrom, lastValueFrom } from 'rxjs';

describe('UtilsService', () => {
  let service: UtilsService;
  let mockSessionStorage: Storage;
  let mockRutaActual: BehaviorSubject<string>;
  let mockSaldoOculto: BehaviorSubject<boolean>;
  let mockFiltradoCDTs: BehaviorSubject<boolean>;
  let mockIsLoading: BehaviorSubject<boolean>;

  beforeEach(() => {
    const router = {
      events: {
        pipe: jest.fn().mockReturnThis(),
        subscribe: jest.fn(),
      },
    } as unknown as Router;
    service = new UtilsService(router);

    mockSessionStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      length: 0,
      clear: jest.fn(),
      key: jest.fn(),
      removeItem: jest.fn(),
    };
    Object.defineProperty(window, 'sessionStorage', {
      value: mockSessionStorage,
      writable: true,
    });

    mockRutaActual = new BehaviorSubject<string>('');
    mockSaldoOculto = new BehaviorSubject<boolean>(false);
    mockFiltradoCDTs = new BehaviorSubject<boolean>(false);
    mockIsLoading = new BehaviorSubject<boolean>(false);
  });

  test('debería obtener el patrón de correo', () => {
    // Arrange
    const patronCorreo = service.patronCorreo;

    // Act
    const result = patronCorreo.test('someone@example.com');

    // Assert
    expect(result).toBe(true);
  });

  test('debería obtener el patrón de clave', () => {
    // Arrange
    const patronClave = service.patronClave;

    // Act
    const result = patronClave.test('Clave123!');

    // Assert
    expect(result).toBe(true);
  });

  test('debería obtener el patrón de monto', () => {
    // Arrange
    const patronMonto = service.patronMonto;

    // Act
    const result = patronMonto.test('10000');

    // Assert
    expect(result).toBe(true);
  });

  test('debería obtener el patrón de monto de inversión', () => {
    // Arrange
    const patronMontoInversion = service.patronMontoInversion;

    // Act
    const result = patronMontoInversion.test('100000');

    // Assert
    expect(result).toBe(true);
  });

  test('debería obtener el patrón de duración de inversión', () => {
    // Arrange
    const patronDuracionInversion = service.patronDuracionInversion;

    // Act
    const result = patronDuracionInversion.test('360');

    // Assert
    expect(result).toBe(true);
  });

  test('debería obtener un token', () => {
    // Arrange
    const TOKEN_KEY = 'STK';
    const FAKE_TOKEN = 'token';
    (mockSessionStorage.getItem as jest.Mock).mockReturnValue(FAKE_TOKEN);

    // Act
    const token = service.obtenerToken();

    // Assert
    expect(mockSessionStorage.getItem).toHaveBeenCalledWith(TOKEN_KEY);
    expect(token).toBe(FAKE_TOKEN);
  });

  test('debería guardar un token', () => {
    // Arrange
    const TOKEN_KEY = 'STK';
    const FAKE_TOKEN = 'tokenValue';

    // Act
    service.guardarToken(FAKE_TOKEN);

    // Assert
    expect(mockSessionStorage.setItem).toHaveBeenCalledWith(
      TOKEN_KEY,
      FAKE_TOKEN
    );
  });

  test('debería borrar un token', () => {
    // Arrange
    const TOKEN_KEY = 'STK';

    // Act
    service.borrarToken();

    // Assert
    expect(mockSessionStorage.removeItem).toHaveBeenCalledWith(TOKEN_KEY);
  });

  test('debería obtener la ruta actual', async () => {
    // Arrange
    const FAKE_RUTA = 'ruta';
    mockRutaActual.next(FAKE_RUTA);
    (service as any)._rutaActual = mockRutaActual;

    // Act
    const rutaActual = await firstValueFrom(service.obtenerRutaActual());

    // Assert
    expect(rutaActual).toBe(FAKE_RUTA);
  });

  test('debería obtener el saldo oculto', async () => {
    // Arrange
    const FAKE_SALDO_OCULTO = true;
    mockSaldoOculto.next(FAKE_SALDO_OCULTO);
    (service as any)._saldoOculto = mockSaldoOculto;

    // Act
    const saldoOculto = await firstValueFrom(service.obtenerSaldoOculto());

    // Assert
    expect(saldoOculto).toBe(FAKE_SALDO_OCULTO);
  });

  test('debería actualizar el saldo oculto', async () => {
    // Arrange
    const FAKE_SALDO_OCULTO = true;
    (service as any)._saldoOculto = mockSaldoOculto;

    // Act
    service.actualizarSaldoOculto(FAKE_SALDO_OCULTO);
    const saldoOculto = await firstValueFrom(service.obtenerSaldoOculto());

    // Assert
    expect(saldoOculto).toBe(FAKE_SALDO_OCULTO);
  });

  test('debería obtener el filtrado de CDTs', async () => {
    // Arrange
    const FAKE_FILTRADO = true;
    mockFiltradoCDTs.next(FAKE_FILTRADO);
    (service as any)._filtradoCDTs = mockFiltradoCDTs;

    // Act
    const filtradoCDTs = await firstValueFrom(service.obtenerFiltradoCDTs());

    // Assert
    expect(filtradoCDTs).toBe(FAKE_FILTRADO);
  });

  test('debería actualizar el filtrado de CDTs', async () => {
    // Arrange
    const FAKE_FILTRADO = true;
    (service as any)._filtradoCDTs = mockFiltradoCDTs;

    // Act
    service.actualizarFiltradoCDTs(FAKE_FILTRADO);
    const filtradoCDTs = await firstValueFrom(service.obtenerFiltradoCDTs());

    // Assert
    expect(filtradoCDTs).toBe(FAKE_FILTRADO);
  });

  test('debería obtener el estado de carga', async () => {
    // Arrange
    const FAKE_LOADING = true;
    mockIsLoading.next(FAKE_LOADING);
    (service as any)._isLoading = mockIsLoading;

    // Act
    const isLoading = await firstValueFrom(service.isLoading);

    // Assert
    expect(isLoading).toBe(FAKE_LOADING);
  });

  test('debería actualizar el estado de carga', async () => {
    // Arrange
    const FAKE_LOADING = true;
    (service as any)._isLoading = mockIsLoading;

    // Act
    service.isLoading = FAKE_LOADING;
    const isLoading = await firstValueFrom(service.isLoading);

    // Assert
    expect(isLoading).toBe(FAKE_LOADING);
  });

  test('debería convertir un monto a formato COP', () => {
    // Arrange
    const monto = 1000000;
    const FAKE_MONTO_FORMAT = '$\xA01.000.000,00'; // Usar caracter del espacio en blanco específico (\xA0) para evitar problemas de codificación

    // Act
    const montoFormat = service.convertirCOP(monto);

    // Replace spaces with specific characters

    // Assert
    expect(montoFormat).toBe(FAKE_MONTO_FORMAT);
  });

  test('debería convertir un número a formato de porcentaje', () => {
    // Arrange
    const porcentaje = 33.3;
    const FAKE_PORCENTAJE_FORMAT = '33,30\xA0%'; // Usar caracter del espacio en blanco específico (\xA0) para evitar problemas de codificación

    // Act
    const porcentajeFormat = service.convertirPorcentaje(porcentaje);

    // Assert
    expect(porcentajeFormat).toBe(FAKE_PORCENTAJE_FORMAT);
  });

  test('debería convertir una fecha a formato local', () => {
    // Arrange
    const fecha = '2024-05-27T14:04:00Z';
    const FAKE_FECHA_FORMAT = '27 de may., 2:04 pm'; // Usar caracter del espacio en blanco específico (\xA0) para evitar problemas de codificación

    // Act
    const fechaFormat = service.convertirFecha(fecha);

    // Assert
    expect(fechaFormat).toBe(FAKE_FECHA_FORMAT);
  });

  test('debería convertir una fecha a formato local (sin hora)', () => {
    // Arrange
    const fecha = '2029-04-14';
    const FAKE_FECHA_FORMAT = '14 de abril de 2029';

    // Act
    const fechaFormat = service.convertirFecha(fecha, false);

    // Assert
    expect(fechaFormat).toBe(FAKE_FECHA_FORMAT);
  });

  test('debería obtener el nombre de un tipo de movimiento', () => {
    // Arrange
    const tipoMovimiento = 'liquidacion-cdt';
    const FAKE_TIPO_MOVIMIENTO = 'Liquidación de CDT';

    // Act
    const tipoMovimientoFormat = service.obtenerNombreTipoMovimiento(tipoMovimiento);

    // Assert
    expect(tipoMovimientoFormat).toBe(FAKE_TIPO_MOVIMIENTO);
  });

  test('debería obtener el nombre de un estado de CDT', () => {
    // Arrange
    const estadoCDT = 'en-curso';
    const FAKE_ESTADO_CDT = 'En curso';

    // Act
    const estadoCDTFormat = service.obtenerNombreEstadoCDT(estadoCDT);

    // Assert
    expect(estadoCDTFormat).toBe(FAKE_ESTADO_CDT);
  });
});
