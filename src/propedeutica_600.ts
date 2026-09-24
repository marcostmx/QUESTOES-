import { propedeutica_q1_300 } from './propedeutica_q1_300';

// Curated question bank: only the 22 authentic clinical scenario questions (indices 1..22)
// Excludes duplicate question index 0 and all repetitive synthetic template questions (indices 23..600)
export const propedeutica600 = propedeutica_q1_300.slice(1, 23);

