import { HiAnimeProvider } from './hiAnime';
import { AnimePaheProvider } from './animePahe';

export const ALL_PROVIDERS = [
  new HiAnimeProvider(),
  new AnimePaheProvider(),
];

export function getProviderByName(name) {
  return ALL_PROVIDERS.find((p) => p.name.toLowerCase() === name.toLowerCase()) || ALL_PROVIDERS[0];
}
