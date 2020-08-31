import * as _ from 'lodash';

export function getEnumKeys<T extends string | number>(e: Record<string, T>): string[] {
  return _.difference(_.keys(e), _.map(_.filter(_.values(e), _.isNumber), _.toString));
}

export function getEnumValues<T extends string | number>(e: Record<string, T>): T[] {
  return _.values(_.pick(e, getEnumKeys(e)));
}
