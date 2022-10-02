import { atomWithStorage } from 'jotai/utils';
import { TOKEN_STORAGE_KEY } from '@/constants/defaults';

export const tokenAtom = atomWithStorage<string>(TOKEN_STORAGE_KEY, '');
