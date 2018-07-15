import { ContactRuoteModule } from './contact-ruote.module';

describe('ContactRuoteModule', () => {
  let contactRuoteModule: ContactRuoteModule;

  beforeEach(() => {
    contactRuoteModule = new ContactRuoteModule();
  });

  it('should create an instance', () => {
    expect(contactRuoteModule).toBeTruthy();
  });
});
