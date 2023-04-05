import { StorageEnum, StorageService } from './storage.service';

fdescribe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    service = new StorageService();
  });

  it('service are defined', () => {
    expect(service).toBeDefined();
  });

  it('#getItem get darkMode value', () => {
    spyOn(window.localStorage, 'getItem').and.returnValue('true');
    expect(service.getItem(StorageEnum.DARK_MODE)).toBe('true');
  });

  it('#setItem set darkMode value', () => {
    spyOn(window.localStorage, 'setItem');
    service.setItem(StorageEnum.DARK_MODE, 'true');
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      StorageEnum.DARK_MODE,
      'true'
    );
  });
});
