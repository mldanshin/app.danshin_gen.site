import { createContext } from 'react';
import visibility from '@/config/visibility.json';

export default createContext(visibility.visible);