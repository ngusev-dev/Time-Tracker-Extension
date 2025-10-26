class routes {
  _PREFIX = '/index.html';

  MAIN = this._PREFIX;
  STATISTIC = 'statistic';

  goTo(path: string) {
    return this._PREFIX + `/${path}`;
  }
}

export const ROUTES = new routes();
