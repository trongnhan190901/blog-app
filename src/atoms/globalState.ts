import { atom } from 'jotai';
import { User } from '~/type';

export const userId = atom<User | null>(null);
