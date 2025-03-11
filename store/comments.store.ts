import { Comment, CommentParamsType } from '@/@types';
import { filter, last } from 'lodash';
import { makeAutoObservable } from 'mobx';

class CommentsStore {
  public comments: Comment[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setComments = (comments: Comment[]) => {
    this.comments = comments;
  };

  addComment = (comment: CommentParamsType) => {
    const newComment = {
      id: this.lastCommentId + 1,
      timestamp: new Date().toISOString(),
      parent_id: null,
      ...comment,
    };
    this.comments.push(newComment);
  };

  deleteComment = (id: number) => {
    this.comments = filter(this.comments, (c) => c.id !== id);
  };

  get lastCommentId() {
    const lastComment = last(this.comments);
    return lastComment ? lastComment.id : 0;
  }

  clearAllComments = () => {
    this.comments = [];
  };
}

export const commentsStore = new CommentsStore();
