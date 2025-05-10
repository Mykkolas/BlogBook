import { useDispatch } from 'react-redux'
import './App.css'
import NavBar from './components/NavBar/NavBar'
import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import { Suspense, useEffect } from 'react'
import Loader from './components/Loader/Loader'
import { selectLoading } from './redux/posts/selectors'
import Layout from './components/Layout/Layout'
import { Route, Routes } from 'react-router-dom'
import { PrivateRoute } from './components/PrivateRoute'
import { RestrictedRoute } from './components/RestrictedRoute'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import PostPage from './pages/PostPage/PostPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import AuthLayout from './components/AuthLayout/AuthLayout'

function App() {
  /*   const dispatch = useDispatch()
    useEffect(() => {
      dispatch()
    }) */

  return (
    <>
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

    </>
  )
}

export default App
