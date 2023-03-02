import React, { useEffect, useState } from 'react';
import { Box, FormControl, Typography } from '@mui/material';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { LoadingButton } from '@mui/lab';
import { ICommentsLayout } from './comments.types';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { commentsAPI } from '../../store/services';
import { Loader, CommentInput } from '../../UI';
import { CommentCard } from '../../components';
import { setAlert } from '../../store/reducers';

export function Comments({ itemId }: ICommentsLayout) {
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
    } else if (isSendError) {
      dispatch(
        setAlert({
          isOpen: true,
          text: 'Oops! Something went wrong',
          type: 'error',
        })
      );
    }
  }, [isSendSuccess]);

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(event.target.value);
  };

  return (
    <Box>
      {isError ? (
        <Typography>Something went wrong</Typography>
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
              Comments:
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
                Send comment:
              </Typography>
              <FormControl fullWidth>
                <CommentInput
                  value={newComment}
                  onChange={handleInput}
                  placeholder="Type something here…"
                  minRows={3}
                />
                <LoadingButton
                  onClick={handleSend}
                  loading={isSendLoading}
                  variant="contained"
                  disabled={newComment.trim() === ''}
                  sx={{ ml: 'auto' }}
                >
                  Send
                </LoadingButton>
              </FormControl>
            </Box>
          </Box>
        )
      )}
    </Box>
  );
}
