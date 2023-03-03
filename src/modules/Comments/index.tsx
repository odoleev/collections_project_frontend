import React, { useEffect, useState } from 'react';
import { Box, FormControl, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ICommentsLayout } from './comments.types';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { commentsAPI } from '../../store/services';
import { Loader, CommentInput } from '../../UI';
import { CommentCard } from '../../components';
import { logoutUser, setAlert } from '../../store/reducers';
import { rtkErrorHandler } from '../../helpers/utils/rtkErrorHandler';

export function Comments({ itemId }: ICommentsLayout) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [newComment, setNewComment] = useState<string>('');
  const { id, accessToken, username } = useAppSelector(
    (state) => state.authReducer
  );
  const { data, isLoading, isError, isSuccess, refetch } =
    commentsAPI.useGetCommentsQuery(itemId, { pollingInterval: 5000 });

  const [
    createComment,
    {
      isLoading: isSendLoading,
      isError: isSendError,
      error: sendError,
      isSuccess: isSendSuccess,
    },
  ] = commentsAPI.useCreateCommentMutation();

  const handleSend = async () => {
    if (id && accessToken && username) {
      setNewComment('');
      await createComment({
        author: username,
        authorId: id,
        text: newComment,
        itemId,
      });
    }
  };

  useEffect(() => {
    if (isSendSuccess) {
      dispatch(
        setAlert({
          isOpen: true,
          text: 'Successfully sent!',
          type: 'success',
        })
      );
      refetch();
    } else if (isSendError && sendError) {
      if (rtkErrorHandler(sendError).statusCode === 401) {
        dispatch(logoutUser());
        navigate('/');
      } else {
        dispatch(
          setAlert({
            isOpen: true,
            type: 'error',
            text: 'Server error',
          })
        );
      }
    }
  }, [isSendSuccess]);

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(event.target.value);
  };

  return (
    <Box>
      {isError ? (
        <Typography>{t('error.wrong')}</Typography>
      ) : isLoading ? (
        <Loader />
      ) : (
        isSuccess && (
          <Box>
            <Typography
              component="h2"
              fontWeight={700}
              fontSize="35px"
              marginBottom="30px"
            >
              {t('comment.comments')}
            </Typography>
            {data.map((comment) => (
              <CommentCard
                key={comment._id}
                text={comment.text}
                author={comment.author}
                authorId={comment.authorId}
                createdAt={comment.createdAt}
              />
            ))}
            <Box>
              <Typography
                component="h2"
                fontWeight={700}
                fontSize="20px"
                marginBottom="10px"
              >
                {t('comment.send_comment')}
              </Typography>
              <FormControl fullWidth>
                <CommentInput
                  value={newComment}
                  onChange={handleInput}
                  placeholder={`${t('comment.type')}`}
                  minRows={3}
                />
                <LoadingButton
                  onClick={handleSend}
                  loading={isSendLoading}
                  variant="contained"
                  disabled={newComment.trim() === ''}
                  sx={{ ml: 'auto' }}
                >
                  {t('comment.send')}
                </LoadingButton>
              </FormControl>
            </Box>
          </Box>
        )
      )}
    </Box>
  );
}
