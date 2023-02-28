import React, { useEffect } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import {
  AdminPanelSettings,
  Block,
  Delete,
  Done,
  Person,
} from '@mui/icons-material';
import { RolesEnum } from '../../types';
import { authAPI, usersAPI } from '../../store/services';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { logoutUser } from '../../store/reducers';

export function TableActions({ row }: { row: any }) {
  const dispatch = useAppDispatch();
  const { id: currentId, accessToken } = useAppSelector(
    (state) => state.authReducer
  );
  const [logout, { isSuccess: isLogoutSuccess }] = authAPI.useLogoutMutation();
  const [makeRoleUser] = usersAPI.useMakeRoleUserMutation();
  const [makeRoleAdmin] = usersAPI.useMakeRoleAdminMutation();
  const [blockUser] = usersAPI.useBlockUserMutation();
  const [unblockUser] = usersAPI.useUnblockUserMutation();
  const [deleteUser] = usersAPI.useDeleteUserMutation();

  const checkForLogout = (id: string) => {
    if (currentId === id && accessToken) {
      logout(accessToken);
      dispatch(logoutUser());
    }
  };
  const handleBlock = (id: string) => {
    blockUser(row.original.id);
    checkForLogout(id);
  };

  const handleRoleUser = (id: string) => {
    makeRoleUser(row.original.id);
    checkForLogout(id);
  };

  const handleDeleteUser = (id: string) => {
    deleteUser(row.original.id);
    checkForLogout(id);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Tooltip arrow placement="top" title="Block">
        <span>
          <IconButton
            disabled={row.original.banStatus === 'true'}
            color="error"
            onClick={() => handleBlock(row.original.id)}
          >
            <Block />
          </IconButton>
        </span>
      </Tooltip>

      <Tooltip arrow placement="top" title="Unblock">
        <span>
          <IconButton
            disabled={row.original.banStatus === 'false'}
            color="success"
            onClick={() => unblockUser(row.original.id)}
          >
            <Done />
          </IconButton>{' '}
        </span>
      </Tooltip>

      <Tooltip arrow placement="top" title="Make admin">
        <span>
          {' '}
          <IconButton
            disabled={row.original.roles === RolesEnum.ADMIN}
            color="primary"
            onClick={() => makeRoleAdmin(row.original.id)}
          >
            <AdminPanelSettings />
          </IconButton>
        </span>
      </Tooltip>

      <Tooltip arrow placement="top" title="Make user">
        <span>
          <IconButton
            disabled={row.original.roles === RolesEnum.USER}
            color="secondary"
            onClick={() => handleRoleUser(row.original.id)}
          >
            <Person />
          </IconButton>
        </span>
      </Tooltip>

      <Tooltip arrow placement="top" title="Delete">
        <span>
          <IconButton
            color="error"
            onClick={() => handleDeleteUser(row.original.id)}
          >
            <Delete />
          </IconButton>
        </span>
      </Tooltip>
    </Box>
  );
}
