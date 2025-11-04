class routes {
  _PREFIX = '/index.html';

  MAIN = this._PREFIX;
  STATISTIC = 'statistic';
  HISTORY = 'history';

  goTo(path: string) {
    return this._PREFIX + `/${path}`;
  }
}

export const ROUTES = new routes();
