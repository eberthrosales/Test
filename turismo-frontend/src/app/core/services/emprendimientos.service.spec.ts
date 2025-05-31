import { TestBed } from '@angular/core/testing';
import { EmprendimientosService, Emprendimiento } from './emprendimientos.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environments/environments';

describe('EmprendimientosService', () => {
  let service: EmprendimientosService;
  let httpMock: HttpTestingController;
  const API_URL = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmprendimientosService]
    });
    service = TestBed.inject(EmprendimientosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debe obtener los emprendimientos del usuario actual', () => {
    const mockData: Emprendimiento[] = [
      { id: 1, nombre: 'Mi Emprendimiento', tipo_servicio: 'Turismo', descripcion: '', ubicacion: '', telefono: '', email: '', categoria: 'Hotel' }
    ];

    service.getMisEmprendimientos().subscribe((emprendimientos) => {
      expect(emprendimientos.length).toBe(1);
      expect(emprendimientos[0].nombre).toBe('Mi Emprendimiento');
    });

    const req = httpMock.expectOne(`${API_URL}/mis-emprendimientos`);
    expect(req.request.method).toBe('GET');
    req.flush({ data: mockData });
  });

  it('debe obtener un emprendimiento específico', () => {
    const mockEmprendimiento: Emprendimiento = {
      id: 1, nombre: 'Test', tipo_servicio: 'Turismo', descripcion: '', ubicacion: '', telefono: '', email: '', categoria: 'Hotel'
    };

    service.getEmprendimiento(1).subscribe((emprendimiento) => {
      expect(emprendimiento.id).toBe(1);
      expect(emprendimiento.nombre).toBe('Test');
    });

    const req = httpMock.expectOne(`${API_URL}/mis-emprendimientos/1`);
    expect(req.request.method).toBe('GET');
    req.flush({ data: mockEmprendimiento });
  });

  it('debe actualizar un emprendimiento con formData', () => {
    const mockResponse: Emprendimiento = {
      id: 1, nombre: 'Actualizado', tipo_servicio: 'Turismo', descripcion: '', ubicacion: '', telefono: '', email: '', categoria: 'Hotel'
    };

    const dataToUpdate = {
      nombre: 'Actualizado',
      tipo_servicio: 'Turismo',
      descripcion: 'Desc actualizada',
      ubicacion: 'Ubicación X',
      telefono: '999999999',
      email: 'test@example.com',
      categoria: 'Hotel'
    };

    service.updateEmprendimiento(1, dataToUpdate).subscribe((updated) => {
      expect(updated.nombre).toBe('Actualizado');
    });

    const req = httpMock.expectOne(`${API_URL}/emprendedores/1`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body instanceof FormData).toBeTrue();
    req.flush({ data: mockResponse });
  });
});
