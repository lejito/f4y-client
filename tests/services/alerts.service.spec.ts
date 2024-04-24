import { AlertsService } from '@services/alerts.service';

import Swal from 'sweetalert2';

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

describe('AlertsService', () => {
  let service: AlertsService;
  let swalSpy: jest.SpyInstance;

  beforeEach(() => {
    service = new AlertsService();
    swalSpy = jest.spyOn(Swal, 'fire');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('debería mostrar un mensaje', () => {
    // Act
    service.message('success', 'Prueba exitosa');

    // Assert
    expect(swalSpy).toHaveBeenCalledWith({
      icon: 'success',
      title: 'Mensaje del sistema',
      html: 'Prueba exitosa',
      color: 'var(--color-dark)',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: 'var(--color-primary)',
    });
  });

  test('debería confirmar una acción (verdadera)', async () => {
    // Arrange
    swalSpy.mockResolvedValueOnce({ isConfirmed: true });

    // Act
    const result = await service.confirm('¿Estás seguro?');

    // Assert
    expect(swalSpy).toHaveBeenCalledWith({
      icon: 'warning',
      title: 'Confirmar acción',
      html: '¿Estás seguro?',
      color: 'var(--color-dark)',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: 'var(--color-primary)',
      cancelButtonColor: 'var(--color-danger)'
    });

    expect(result).toBe(true);
  });

  test('debería confirmar una acción (falsa)', async () => {
    // Arrange
    swalSpy.mockResolvedValueOnce({ isConfirmed: false });

    // Act
    const result = await service.confirm('¿Estás seguro?');

    // Assert
    expect(swalSpy).toHaveBeenCalledWith({
      icon: 'warning',
      title: 'Confirmar acción',
      html: '¿Estás seguro?',
      color: 'var(--color-dark)',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: 'var(--color-primary)',
      cancelButtonColor: 'var(--color-danger)'
    });

    expect(result).toBe(false);
  });
});
