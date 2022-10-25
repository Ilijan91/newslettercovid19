export interface Statistics {
  get: string;
  parameters: {
    country: string;
  };
  errors: Array<any>;
  results: number;
  response: Array<Stats>;
}
export interface Stats {
  continent: string;
  country: string;
  population: number;
  cases: {
    new: string;
    active: number;
    critical: number;
    recovered: number;
    '1M_pop': string;
    total: number;
  };
  deaths: {
    new: string;
    '1M_pop': string;
    total: number;
  };
  tests: {
    '1M_pop': string;
    total: number;
  };
  day: string;
  time: string;
}
