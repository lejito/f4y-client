import { TestBed, ComponentFixture } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { UtilsService } from 'src/app/services/utils.service';
import { CuentasService } from 'src/app/services/cuentas.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let utilsService: UtilsService;
  let cuentasService: CuentasService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [UtilsService, CuentasService],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    utilsService = TestBed.inject(UtilsService);
    cuentasService = TestBed.inject(CuentasService);
  });

  it('should create the LoginComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should set the title correctly', () => {
    const title = TestBed.inject(Title);
    spyOn(title, 'setTitle');

    fixture.detectChanges();

    expect(title.setTitle).toHaveBeenCalledWith('Fin4Youth: Inicio de sesión');
  });

  it('should verify fields correctly', () => {
    component.formulario.tipoIdentificacion = 'Tipo';
    component.formulario.numeroIdentificacion = '123';
    component.formulario.clave = 'password';

    const result = component.verificarCampos();

    expect(result).toBeTruthy();
  });

  it('should not allow login if fields are not filled', () => {
    spyOn(utilsService, 'isLoading', 'set');
    spyOn(cuentasService, 'iniciarSesion');

    component.ingresar();

    expect(utilsService.isLoading).not.toHaveBeenCalledWith(true);
    expect(cuentasService.iniciarSesion).not.toHaveBeenCalled();
  });

  it('should allow login if fields are filled', async () => {
    component.formulario.tipoIdentificacion = 'Tipo';
    component.formulario.numeroIdentificacion = '123';
    component.formulario.clave = 'password';
    spyOn(utilsService, 'isLoading', 'set').and.stub();
    spyOn(cuentasService, 'iniciarSesion').and.returnValue(Promise.resolve());

    await component.ingresar();

    expect(utilsService.isLoading).toHaveBeenCalledWith(true);
    expect(cuentasService.iniciarSesion).toHaveBeenCalledWith('Tipo', '123', 'password');
    expect(utilsService.isLoading).toHaveBeenCalledWith(false);
  });
});
