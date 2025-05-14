import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loader from './components/Loader/Loader';
import { PrivateRoute } from './components/PrivateRoute';
import { RestrictedRoute } from './components/RestrictedRoute';
import './App.css'

const Layout = lazy(() => import('./components/Layout/Layout'));
const AuthLayout = lazy(() => import('./components/AuthLayout/AuthLayout'));
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));
const PostPage = lazy(() => import('./pages/PostPage/PostPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage/ProfilePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='/posts' element={<PrivateRoute component={<PostPage />} />} />
          <Route path='/profile' element={<PrivateRoute component={<ProfilePage />} />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path='/register' element={<RestrictedRoute component={<RegisterPage />} />} />
          <Route path='/login' element={<RestrictedRoute component={<LoginPage />} />} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
