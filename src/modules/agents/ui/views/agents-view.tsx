'use client';
import { useSuspenseQuery } from '@tanstack/react-query';

import { useTRPC } from '@/trpc/client';
import { LoadingState } from '@/components/loading-state';
import { ErrorState } from '@/components/error-state';
import { DataTable } from '../components/data-table';
import { columns } from '../components/columns';
import { EmptyState } from '@/components/empty-state';
import { useAgentsFilters } from '../../hooks/use-agents-filters';
import { DataPagination } from '../components/data-pagination';
import { useRouter } from 'next/navigation';

export const AgentsView = () => {
  const router = useRouter();
  const [filters, setFilters] = useAgentsFilters();
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({
      ...filters,
    })
  );

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-4">
      <DataTable
        columns={columns}
        data={data.items}
        onRowClick={(row) => router.push(`/agents/${row.id}`)}
      />
      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />
      {data.items.length === 0 && (
        <EmptyState
          title="No agents found"
          description="You haven't created any agents yet. Create an agent to get started. Each agent can be customized with different instructions and settings."
        />
      )}
    </div>
  );
};

export const AgentsViewLoading = () => {
  return (
    <LoadingState
      title="Loading agents..."
      description="this may take a few seconds"
    />
  );
};

export const AgentsViewError = () => {
  return (
    <ErrorState
      title="Error loading agents"
      description="An error occurred while trying to load the agents. Please try again later."
    />
  );
};
