export const toDate = (dateable) => new Date(dateable);
export const now = () => new Date();

// `toLocaleDateString('', { weekday: 'short' })` is not supported in
// current Safari and before IE 11. As of May 4th 2016!
const isNativeLocaleDateStringSupported =
  new Date('2000-01-01').toLocaleDateString('de', { weekday: 'short' }) === 'Sa';

const nativeLocalWeekdayInShortForm = (date) =>
  date.toLocaleDateString('de', { weekday: 'short' });

const ourGermanOnlyLocalWeekdayInShortForm = (date) =>
  ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'][date.getDay()];

export const localWeekdayInShortForm = isNativeLocaleDateStringSupported
    ? nativeLocalWeekdayInShortForm
    : ourGermanOnlyLocalWeekdayInShortForm;
