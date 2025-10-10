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

    if (status === 'in_progress') {
      return !isPSApproved || !isSSApproved;
    }
    if (status === 'approved') {
      return isPSApproved === true && isSSApproved === true;
    }
    return false;
  });
};
