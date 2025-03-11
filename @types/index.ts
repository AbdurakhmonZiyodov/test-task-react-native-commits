export interface User {
  id: number; // Unique user ID
  email: string; // User's email address
  username: string; // User's username
}

export interface Comment {
  id: number; // Unique comment ID
  userId: number; // ID of the user who made the comment
  message: string; // Comment text
  parent_id?: number | null; // Optional parent comment ID (if it's a reply)
  timestamp: string; // Timestamp when the comment was created (ISO format or string)
}

export type UserParamsType = Pick<User, 'email' | 'username'>;
export type CommentParamsType = Pick<
  Comment,
  'userId' | 'message' | 'parent_id'
>;
