import { CommentParamsType, Comment } from '@/@types';
import useDB from './useDB';
import useVisibility from './useVisibility';
import { useCallback } from 'react';
import { commentsStore } from '@/store/comments.store';
import { isEmpty } from 'lodash';

const useComments = () => {
  const { createComment, fetchComments, createReply } = useDB();
  const loadingOfCreateComment = useVisibility();
  const loadingOfFetchAllComments = useVisibility();
  const loadingOfCreateReplayComment = useVisibility();
  const loadingOfFetchAllReplayComments = useVisibility();

  const createCommentHandler = useCallback(
    async (comment: CommentParamsType, callback?: () => void) => {
      loadingOfCreateComment.show();
      try {
        const isSuccess = await createComment(comment);
        if (isSuccess) {
          commentsStore.addComment(comment);
          callback && callback();
        }
      } catch (err) {
        console.error(err);
      } finally {
        loadingOfCreateComment.hide();
      }
    },
    [createComment, loadingOfCreateComment],
  );

  const fetchAllCommentsHandler = useCallback(async () => {
    loadingOfFetchAllComments.show();
    try {
      const comments = await fetchComments();
      if (!isEmpty(comments)) {
        commentsStore.setComments(comments as Comment[]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      loadingOfFetchAllComments.hide();
    }
  }, [fetchComments, loadingOfFetchAllComments]);

  const createReplayCommentHandler = useCallback(
    async (comment: CommentParamsType, callback?: () => void) => {
      loadingOfCreateReplayComment.show();
      try {
        const isSuccess = await createReply(comment);
        if (isSuccess) {
          callback && callback();
        }
      } catch (err) {
        console.error(err);
      } finally {
        loadingOfCreateReplayComment.hide();
      }
    },
    [createReply, loadingOfCreateReplayComment],
  );

  const fetchAllReplayCommentsHandler = useCallback(
    async (parentId: number, callback: (replayMessages: Comment[]) => void) => {
      loadingOfFetchAllReplayComments.show();
      try {
        const comments = await fetchComments(parentId);
        if (!isEmpty(comments)) {
          callback(comments as Comment[]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        loadingOfFetchAllReplayComments.hide();
      }
    },
    [fetchComments, loadingOfFetchAllReplayComments],
  );

  return {
    createCommentHandler,
    fetchAllCommentsHandler,
    createReplayCommentHandler,
    fetchAllReplayCommentsHandler,
    isLoadingOfCreateComment: loadingOfCreateComment.visible,
    isLoadingOfFetchAllComments: loadingOfFetchAllComments.visible,
    isLoadingOfCreateReplayComment: loadingOfCreateReplayComment.visible,
    isLoadingOfFetchAllReplayComments: loadingOfFetchAllReplayComments.visible,
  };
};

export default useComments;
