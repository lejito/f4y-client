import { Router } from '@angular/router';
import { AlertsService } from '@app/services/alerts.service';
import { UtilsService } from '@app/services/utils.service';
import { environment } from '@environments/environment';
import { CuentasService } from '@services/cuentas.service';
import { Response } from '@customTypes/Response';
import axios from 'axios';

describe('CuentasService', () => {
  let service: CuentasService;
  let router: Router;
  let alertsService: AlertsService;
  let utilsService: UtilsService;

  beforeEach(() => {
    router = {
      navigate: jest.fn(),
      events: {
        pipe: jest.fn().mockReturnThis(),
        subscribe: jest.fn(),
      },
    } as unknown as Router;

    alertsService = {
      message: jest.fn(),
    } as unknown as AlertsService;

    utilsService = {
      obtenerToken: jest.fn(),
      guardarToken: jest.fn(),
      borrarToken: jest.fn(),
    } as unknown as UtilsService;

    service = new CuentasService(router, alertsService, utilsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('debería calcular la edad', () => {
    const fechaNacimiento = '2000-06-16';
    const edad = service.calcularEdad(fechaNacimiento);
    expect(edad).toBe(23);
  });

  test('debería crear una cuenta', async () => {
    // Arrange
    const datos = {
      tipoIdentificacion: 'CC',
      numeroIdentificacion: '1234567890',
      primerNombre: 'Juan',
      segundoNombre: 'Carlos',
      primerApellido: 'Pérez',
      segundoApellido: 'Gómez',
      fechaNacimiento: '2000-06-16',
      correo: 'jcarlos0616@gmail.com',
      clave: 'Clave123!',
    };
    const mockResponse: Response = {
      type: 'success',
      message: 'Cuenta creada correctamente. Ya puedes iniciar sesión.',
      body: {
        id: expect.any(Number),
      },
      error: false,
    };
    jest.spyOn(axios, 'post').mockResolvedValue({ data: mockResponse });

    // Act
    const response = await service.crear(
      datos.tipoIdentificacion,
      datos.numeroIdentificacion,
      datos.primerNombre,
      datos.segundoNombre,
      datos.primerApellido,
      datos.segundoApellido,
      datos.fechaNacimiento,
      datos.correo,
      datos.clave
    );

    // Assert
    expect(axios.post).toHaveBeenCalledWith(
      `${environment.apiKey}/cuentas/crear`,
      datos
    );
    expect(alertsService.message).toHaveBeenCalledWith(
      'success',
      mockResponse.message
    );
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
    expect(response).toBe(true);
  });

  test('debería iniciar sesión', async () => {
    // Arrange
    const datos = {
      tipoIdentificacion: 'CC',
      numeroIdentificacion: '1234567890',
      clave: 'Clave123!',
    };
    const mockResponse: Response = {
      type: 'success',
      message: 'Sesión iniciada correctamente.',
      body: {
        token: expect.any(String),
      },
      error: false,
    };
    jest.spyOn(axios, 'post').mockResolvedValue({ data: mockResponse });

    // Act
    const response = await service.iniciarSesion(
      datos.tipoIdentificacion,
      datos.numeroIdentificacion,
      datos.clave
    );

    // Assert
    expect(axios.post).toHaveBeenCalledWith(
      `${environment.apiKey}/cuentas/iniciar-sesion`,
      datos
    );
    expect(utilsService.guardarToken).toHaveBeenCalledWith(
      mockResponse.body.token
    );
    expect(alertsService.message).toHaveBeenCalledWith(
      'success',
      mockResponse.message
    );
    expect(router.navigate).toHaveBeenCalledWith(['/panel']);
    expect(response).toBe(true);
  });

  test('debería cerrar sesión', async () => {
    // Arrange
    const token = 'anyToken';
    const mockResponse: Response = {
      type: 'success',
      message: 'Sesión cerrada correctamente.',
      body: null,
      error: false,
    };

    jest.spyOn(utilsService, 'obtenerToken').mockReturnValue(token);
    jest.spyOn(axios, 'get').mockResolvedValue({ data: mockResponse });

    // Act
    const response = await service.cerrarSesion();

    // Assert
    expect(utilsService.obtenerToken).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(
      `${environment.apiKey}/cuentas/cerrar-sesion`,
      { headers: { Authorization: token } }
    );
    expect(alertsService.message).toHaveBeenCalledWith(
      'success',
      mockResponse.message
    );
    expect(utilsService.borrarToken).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
    expect(response).toBe(true);
  });

  test('debería verificar la sesión (sin token en panel)', async () => {
    // Arrange
    const pagina = 'panel';
    const mockResponse: Response = {
      type: 'error',
      message: 'Es necesario iniciar sesión para acceder a esta ruta.',
      body: null,
      error: true,
    };

    jest.spyOn(utilsService, 'obtenerToken').mockReturnValue(null);
    jest.spyOn(axios, 'get').mockResolvedValue({ data: mockResponse });

    // Act
    const response = await service.verificarSesion(pagina);

    // Assert
    expect(utilsService.obtenerToken).toHaveBeenCalled();
    expect(alertsService.message).toHaveBeenCalledWith(
      'error',
      mockResponse.message
    );
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
    expect(response).toBe(false);
  });
});
