import { fisio176Cardiovascular } from './fisio_176_cv';
import { fisio176Respiratorio } from './fisio_176_resp';
import { fisio176Endocrino } from './fisio_176_endo';
import { fisio176RenalDigestorio } from './fisio_176_renal_dig';

export const fisio176All = [
    ...fisio176Cardiovascular,
    ...fisio176Respiratorio,
    ...fisio176Endocrino,
    ...fisio176RenalDigestorio
];
