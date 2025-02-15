import { createContext } from 'react';
import themes from '@/components/theme/themes.json';

export default createContext(themes.dark);