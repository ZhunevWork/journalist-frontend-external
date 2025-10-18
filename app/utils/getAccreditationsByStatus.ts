import { useGetAccreditationsQuery } from '~/api/controllers/accreditation';
import type { IAccreditation } from '~/api/controllers/accreditation/types';

type AccreditationStatus = 'in_progress' | 'approved' | 'rejected';

export const getAccreditationsByStatus = (
  status: AccreditationStatus,
): IAccreditation[] => {
  const { data: accreditations } = useGetAccreditationsQuery();

  if (!accreditations) return [];

  return accreditations.data.filter(accreditation => {
    const isPSApproved = accreditation.is_approved_by_ps;
    const isSSApproved = accreditation.is_approved_by_ss;

    const isRejected = isPSApproved === false || isSSApproved === false;

    const isBothApproved = isPSApproved === true && isSSApproved === true;

    const isInProgress = !isRejected && !isBothApproved;

    if (status === 'in_progress') {
      return isInProgress;
    }
    if (status === 'approved') {
      return isBothApproved;
    }
    if (status === 'rejected') {
      return isRejected;
    }
    return false;
  });
};
