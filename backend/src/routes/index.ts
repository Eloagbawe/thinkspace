import authRouter from './authRoutes';
import userRouter from './userRoutes';
import blogRouter from './blogRoutes';
import commentRouter from './commentRoutes';
import replyRouter from './replyRoutes';
import blogCategoryRouter from './blogCategoryRoutes';

export default { 
  authRouter, userRouter,
  blogRouter, blogCategoryRouter,
  commentRouter, replyRouter 
};
