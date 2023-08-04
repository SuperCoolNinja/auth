import { createContext } from 'react';
import { IAppContext } from '../interfaces/IContext';

export const AppContext = createContext<IAppContext | null>(null);