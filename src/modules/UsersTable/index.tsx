import React, { useEffect, useMemo, useState } from 'react';
import MaterialReactTable, {
  MRT_ColumnDef,
  MRT_SortingState,
} from 'material-react-table';
import { IconButton, Tooltip } from '@mui/material';
import { Refresh } from '@mui/icons-material';
import { usersAPI } from '../../store/services';
import { IUsers, RolesEnum } from '../../types';
import { TableActions } from '../../components';
import { useAppDispatch } from '../../store/hooks/redux';
import { setAlert } from '../../store/reducers';
import { Loader } from '../../UI';

type Cols = {
  id: string;
  email: string;
  username: string;
  banStatus: string;
  roles: RolesEnum;
};

export function UsersTable() {
  const dispatch = useAppDispatch();
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const {
    data: usersData,
    isLoading: isUsersLoading,
    isError: isUserError,
    refetch,
  } = usersAPI.useGetUsersQuery({
    limit: pagination.pageSize,
    page: pagination.pageIndex + 1,
    search: globalFilter,
    sort:
      sorting.length > 0
        ? [
            Object.values(sorting[0])[0] as string,
            Object.values(sorting[0])[1] ? -1 : 1,
          ]
        : [],
  });

  useEffect(() => {
    if (isUserError) {
      dispatch(
        setAlert({
          isOpen: true,
          type: 'error',
          text: 'Server error',
        })
      );
    }
  }, [isUserError]);

  const columns: MRT_ColumnDef<Cols>[] = useMemo(
    () => [
      {
        header: 'Id',
        accessorKey: 'id',
      },
      {
        header: 'Email',
        accessorKey: 'email',
      },
      {
        header: 'Username',
        accessorKey: 'username',
      },
      {
        header: 'Ban Status',
        accessorKey: 'banStatus',
      },
      {
        header: 'Role',
        accessorKey: 'roles',
      },
    ],
    []
  );
  const data: Cols[] | undefined = usersData?.users.map((user: IUsers) => {
    return {
      id: user._id,
      email: user.email,
      username: user.username,
      banStatus: String(user.banStatus),
      roles: user.roles,
    };
  });

  return usersData && !isUserError ? (
    <MaterialReactTable
      enableRowActions
      enableFullScreenToggle={false}
      enableColumnFilters={false}
      manualFiltering
      manualPagination
      manualSorting
      enableFilterMatchHighlighting={false}
      onGlobalFilterChange={setGlobalFilter}
      onPaginationChange={setPagination}
      onSortingChange={setSorting}
      rowCount={usersData ? usersData.totalCount : undefined}
      columns={columns}
      data={data ?? []}
      renderRowActions={({ row }) => <TableActions row={row} />}
      renderTopToolbarCustomActions={() => (
        <Tooltip arrow title="Refresh Data">
          <IconButton onClick={refetch}>
            <Refresh />
          </IconButton>
        </Tooltip>
      )}
      state={{
        showProgressBars: isUsersLoading,
        globalFilter,
        isLoading: isUsersLoading,
        pagination,
        sorting,
      }}
    />
  ) : (
    <Loader />
  );
}
