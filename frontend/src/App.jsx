import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Liked from './pages/Liked';
import Watched from './pages/Watched';
import Bookmarked from './pages/Bookmarked';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GenrePage from './pages/GenrePage';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />
      </>
    ),
  },
  {
    path: "/liked",
    element: (
      <>
        <Navbar />
        <Liked />
        <Footer />
      </>
    ),
  },
  {
    path: "/watched",
    element: (
      <>
        <Navbar />
        <Watched />
        <Footer />
      </>
    ),
  },
  {
    path: "/bookmarked",
    element: (
      <>
        <Navbar />
        <Bookmarked />
        <Footer />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Navbar />
        <Login />
      </>
    ),
  },
  {
    path: "/signup",
    element: (
      <>
        <Navbar />
        <Signup />
      </>
    ),
  },
  {
    path: "/genre/:genre",
    element: (
      <>
        <Navbar />
        <GenrePage />
        <Footer />
      </>
    ),
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
