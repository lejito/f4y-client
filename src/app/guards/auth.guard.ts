import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { inject } from '@angular/core';
import { CuentasService } from '../services/cuentas.service';

export async function AuthGuard(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Promise<boolean | UrlTree> {
  const cuentasService = inject(CuentasService);
  const ruta = route.url[0].path;

  if (ruta == 'panel') {
    return await cuentasService.verificarSesion('panel');
  } else {
    return !(await cuentasService.verificarSesion('login-register'));
  }
}
