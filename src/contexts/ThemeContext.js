import { createContext } from 'react';
import themes from '@/config/themes.json';

export default createContext(themes.dark);