import ListAccreditations from '~/components/List/ListAccreditations';
import Button from '~/components/ui/Button';
import Tabs from '~/components/ui/Tabs';
import { useFilteredData } from '~/hooks/useFilteredData';
import { useResponsive } from '~/hooks/useResponsive';
import { useChangeParam } from '~/hooks/useSearch';
import { getAccreditationsByStatus } from '~/utils/getAccreditationsByStatus';
import { useState } from 'react';

export default function AccreditationsPageList() {
  const { isLg } = useResponsive();

  const [selectedTab, setSelectedTab] = useState(1);
  const { getParam } = useChangeParam();
  const { filterByField } = useFilteredData();

  const searchQuery = getParam('search') || '';

  const approvedAccreditations = getAccreditationsByStatus('approved');
  const inProgressAccreditations = getAccreditationsByStatus('in_progress');

  const filteredApprovedAccreditations = filterByField(
    approvedAccreditations,
    searchQuery,
    accreditation => accreditation.event.name,
  );
  const filteredInProgressAccreditations = filterByField(
    inProgressAccreditations,
    searchQuery,
    accreditation => accreditation.event.name,
  );

  return (
    <div className="lg:m-0 lg:p-0 lg:bg-transparent -mx-4 px-4 bg-(--bg-secondary) py-5">
      {!isLg && (
        <Tabs
          selectedId={selectedTab}
          onChange={tab => setSelectedTab(tab)}
          className="pb-5"
        >
          <Button
            styleType={selectedTab === 1 ? 'tertiary' : 'primary'}
            classNames="w-full"
            disabled={filteredInProgressAccreditations.length === 0}
          >
            На рассмотрении
          </Button>
          <Button
            styleType={selectedTab === 2 ? 'tertiary' : 'primary'}
            classNames="w-full"
            disabled={filteredApprovedAccreditations.length === 0}
          >
            Одобренные
          </Button>
        </Tabs>
      )}

      <div className="flex flex-wrap justify-between w-full gap-4">
        {(isLg || selectedTab === 1) && (
          <ListAccreditations
            title="На рассмотрении"
            maxHeight={650}
            data={filteredInProgressAccreditations}
          />
        )}
        {(isLg || selectedTab === 2) && (
          <ListAccreditations
            title="Одобренные"
            maxHeight={650}
            data={filteredApprovedAccreditations}
          />
        )}
      </div>
    </div>
  );
}
