import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {

  public message(icon: SweetAlertIcon, message: string): void {
    Swal.fire({
      icon: icon,
      title: 'Mensaje del sistema',
      html: message,
      color: 'var(--color-dark)',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: 'var(--color-primary)',
    });
  }

  public async confirm(message: string): Promise<boolean> {
    const result = await Swal.fire({
      icon: 'warning',
      title: 'Confirmar acción',
      html: message,
      color: 'var(--color-dark)',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: 'var(--color-primary)',
      cancelButtonColor: 'var(--color-danger)'
    });
    return result.isConfirmed;
  }
}
