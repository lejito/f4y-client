import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { UtilsService } from 'src/app/services/utils.service';
import { CuentasService } from 'src/app/services/cuentas.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let utilsService: UtilsService;
  let cuentasService: CuentasService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      providers: [UtilsService, CuentasService],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    utilsService = TestBed.inject(UtilsService);
    cuentasService = TestBed.inject(CuentasService);
  });

  it('should create the RegisterComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should set the title correctly', () => {
    const title = TestBed.inject(Title);
    spyOn(title, 'setTitle');

    fixture.detectChanges();

    expect(title.setTitle).toHaveBeenCalledWith('Fin4Youth: Registro');
  });

  it('should verify fields correctly', () => {
    // Simulate valid form fields
    component.formulario.tipoIdentificacion = 'Tipo';
    component.formulario.numeroIdentificacion = '123';
    component.formulario.primerNombre = 'John';
    component.formulario.primerApellido = 'Doe';
    component.formulario.fechaNacimiento = '2000-01-01';
    component.formulario.correo = 'john@example.com';
    component.formulario.clave = 'Password123';
    component.formulario.repetirClave = 'Password123';
    component.formulario.tratamientoDatos = true;
    component.formulario.terminosYCondiciones = true;

    const result = component.verificarCampos();

    expect(result).toBeTruthy();
  });

  it('should not allow registration if fields are not filled', () => {
    spyOn(utilsService, 'isLoading', 'set');
    spyOn(cuentasService, 'crear');

    component.registrar();

    expect(utilsService.isLoading).not.toHaveBeenCalledWith(true);
    expect(cuentasService.crear).not.toHaveBeenCalled();
  });

  it('should allow registration if fields are filled', async () => {
    // Simulate valid form fields
    component.formulario.tipoIdentificacion = 'Tipo';
    component.formulario.numeroIdentificacion = '123';
    component.formulario.primerNombre = 'John';
    component.formulario.primerApellido = 'Doe';
    component.formulario.fechaNacimiento = '2000-01-01';
    component.formulario.correo = 'john@example.com';
    component.formulario.clave = 'Password123';
    component.formulario.repetirClave = 'Password123';
    component.formulario.tratamientoDatos = true;
    component.formulario.terminosYCondiciones = true;

    spyOn(utilsService, 'isLoading', 'set').and.stub();
    spyOn(cuentasService, 'crear').and.returnValue(Promise.resolve());

    await component.registrar();

    expect(utilsService.isLoading).toHaveBeenCalledWith(true);
    expect(cuentasService.crear).toHaveBeenCalledWith(
      'Tipo',
      '123',
      'John',
      null,
      'Doe',
      null,
      '2000-01-01',
      'john@example.com',
      'Password123'
    );
    expect(utilsService.isLoading).toHaveBeenCalledWith(false);
  });
});
