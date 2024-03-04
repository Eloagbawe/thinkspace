interface BlogState {
  blog: any;
  blogs: any;
  isBlogLoading: boolean;
  isBlogsLoading: boolean;
}

export const initialBlogState: BlogState = {
  blog: null,
  blogs: null,
  isBlogLoading: false,
  isBlogsLoading: false
}
