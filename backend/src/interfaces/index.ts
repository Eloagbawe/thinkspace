export interface UserAttributes {
  id?: string;
  username?: string;
  email?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  profile_picture_url?: string;
}


export interface BlogAttributes {
  id: string;
  title: string;
  content: string;
}

export interface CommentAttributes {
  id: string;
  content: string;
}
