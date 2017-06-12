import { CDbFirebasePage } from './app.po';

describe('cdb-firebase App', () => {
  let page: CDbFirebasePage;

  beforeEach(() => {
    page = new CDbFirebasePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
