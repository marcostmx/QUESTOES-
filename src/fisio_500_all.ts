import { fisio500Cv } from './fisio_500_cv';
import { fisio500Endo } from './fisio_500_endo';
import { fisio500Dor } from './fisio_500_dor';
import { fisio500Resp } from './fisio_500_resp';

// Deterministic pseudo-random shuffle (Fisher-Yates with LCG) to guarantee stable, reproducible random order
function seededShuffle<T>(array: T[], seed = 2026): T[] {
  const arr = [...array];
  let s = seed;
  for (let i = arr.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const rnd = s / 233280;
    const j = Math.floor(rnd * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

export const fisio500All = seededShuffle([
  ...fisio500Cv,
  ...fisio500Endo,
  ...fisio500Dor,
  ...fisio500Resp
], 2026);

