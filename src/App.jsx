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

function App() {
  /*   const dispatch = useDispatch()
    useEffect(() => {
      dispatch()
    }) */

  return (
    <>
      <Layout>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/register' element={<RestrictedRoute component={<RegisterPage />} />} />
            <Route path='/login' element={<RestrictedRoute component={<LoginPage />} />} />
            <Route path='/posts' element={<PrivateRoute component={<PostPage />} />} />
            <Route path='/profile' element={<PrivateRoute component={<ProfilePage />} />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </>
  )
}

export default App
