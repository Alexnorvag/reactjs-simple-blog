import proxyApiRoutes from '../utils/proxyApiRoutes';

export const apiUrl = 'http://localhost:5000';

const authBaseRoute: string = 'auth';
const usersBaseRoute: string = 'users';
const postsBaseRoute: string = 'posts';

const routes = {
  // Resources routes
  resourceUpload: 'resources',
  uploads: 'uploads/:id',

  // Auth routes
  signUp: `${authBaseRoute}/signUp`,
  signIn: `${authBaseRoute}/signIn`,
  signOut: `${authBaseRoute}/signOut`,
  refreshToken: `${authBaseRoute}/refreshToken`,
  resetAuth: `${authBaseRoute}/resetAuth`,

  // Posts routes
  createPost: postsBaseRoute,
  fetchPosts: postsBaseRoute,
  fetchPostById: `${postsBaseRoute}/:id`,
  updatePostById: `${postsBaseRoute}/:id`,
  deletePostById: `${postsBaseRoute}/:id`,
  fetchNewPostId: `${postsBaseRoute}/newId`,

  // Users routes
  fetchUsers: usersBaseRoute,
  deleteUserById: `${usersBaseRoute}/:id`,
} as const;

export type ApiRoutes = typeof routes;

export default proxyApiRoutes(routes, apiUrl);
