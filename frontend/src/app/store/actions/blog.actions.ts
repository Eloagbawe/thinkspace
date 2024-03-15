import { createAction, props } from "@ngrx/store";

export const getBlogsStart = createAction("[Blog] Get blogs start");
export const getBlogsSuccess = createAction("[Blog] Get blogs success",
  props<{blogs: any[]}>()
);

export const addBlogStart = createAction("[Blog] Add blog start",
  props<{payload: any}>()
);

export const addBlogSuccess = createAction("[Blog] Add blog success");

export const editBlogStart = createAction("[Blog] Edit blog start",
  props<{payload: any}>()
);

export const editBlogSuccess = createAction("[Blog] Edit blog success");
