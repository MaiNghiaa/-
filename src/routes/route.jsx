import { lazy, memo, Suspense } from "react";
import { useRoutes, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import {
  PATH_ADD_COLOR,
  PATH_ADD_PRODUCTS,
  PATH_ADD_PROFILES,
  PATH_ADD_ROMS,
  PATH_ADD_TYPES,
  PATH_COLORS,
  PATH_EDIT_COLOR,
  PATH_EDIT_ROMS,
  PATH_EDIT_TYPES,
  PATH_HOME,
  PATH_LOGIN,
  PATH_PRODUCTS,
  PATH_PROFILES,
  PATH_ROMS,
  PATH_TYPES,
  PATH_WELCOME,
  PATH_WORKSHOP,
} from "./path";
import Dashboard from "../Pages/Dashboard";
import Welcome from "../Pages/Welcome";
//Edit
import EditType from "../Components/Type/EditType";
import EditRom from "../Components/ROM/EditRom";
import Register from "../Pages/Register";
//End Edit

//Form Add
const TypeForm = lazy(() => import("../Components/Type/TypeForm"));
const ProductForm = lazy(() => import("../Components/Products/ProductForm"));
const ProfileForm = lazy(() => import("../Components/Profile/FormProfile"));
const RomForm = lazy(() => import("../Components/ROM/RomForm"));
const ColorForm = lazy(() => import("../Components/Color/ColorForm"));

const Login = lazy(() => import("../Pages/Login"));
const Products = lazy(() => import("../Pages/Products"));
const ROMs = lazy(() => import("../Pages/ROMs"));
const Types = lazy(() => import("../Pages/Types"));
const Profile = lazy(() => import("../Pages/Profile"));
const Colors = lazy(() => import("../Pages/Colors"));
const WorkshopPage = lazy(() => import("../Pages/WorkshopPage"));
export const normalRoutes = [PATH_HOME];
export const authRoutes = [];

function Router() {
  const location = useLocation();

  const routes = [
    {
      path: "/",
      element: (
        <Suspense fallback={<p className="suspense_loading">Loading...</p>}>
          <Welcome />
        </Suspense>
      ),
    },
    {
      path: "/register",
      element: (
        <Suspense fallback={<p className="suspense_loading">Loading...</p>}>
          <Register />
        </Suspense>
      ),
    },
    {
      path: PATH_WELCOME,
      element: (
        <Suspense fallback={<p className="suspense_loading">Loading...</p>}>
          <Welcome />
        </Suspense>
      ),
    },
    {
      path: PATH_WORKSHOP,
      element: (
        <Suspense fallback={<p className="suspense_loading">Loading...</p>}>
          <WorkshopPage />
        </Suspense>
      ),
    },
    {
      path: PATH_HOME,
      element: (
        <Suspense fallback={<p className="suspense_loading">Loading...</p>}>
          <Dashboard />
        </Suspense>
      ),
    },
    //Type ------------------------------------------------------------------
    {
      path: PATH_TYPES,
      element: (
        <Suspense fallback={<p className="suspense_loading">Loading...</p>}>
          <Types />
        </Suspense>
      ),
    },
    {
      path: PATH_ADD_TYPES,
      element: (
        <Suspense fallback={<p className="suspense_loading">Loading...</p>}>
          <TypeForm />
        </Suspense>
      ),
    },
    {
      path: PATH_EDIT_TYPES,
      element: (
        <Suspense fallback={<p className="suspense_loading">Loading...</p>}>
          <EditType />
        </Suspense>
      ),
    },
    //Color ------------------------------------------------------------------

    {
      path: PATH_COLORS,
      element: (
        <Suspense fallback={<p className="suspense_loading">Loading...</p>}>
          <Colors />
        </Suspense>
      ),
    },
    {
      path: PATH_ADD_COLOR,
      element: (
        <Suspense fallback={<p className="suspense_loading">Loading...</p>}>
          <ColorForm />
        </Suspense>
      ),
    },
    {
      path: PATH_EDIT_COLOR,
      element: (
        <Suspense fallback={<p className="suspense_loading">Loading...</p>}>
          <ColorForm />
        </Suspense>
      ),
    },
    //PROFILE ------------------------------------------------------------------

    {
      path: PATH_PROFILES,
      element: (
        <Suspense fallback={<p className="suspense_loading">Loading...</p>}>
          <Profile />
        </Suspense>
      ),
    },
    {
      path: PATH_ADD_PROFILES,
      element: (
        <Suspense fallback={<p className="suspense_loading">Loading...</p>}>
          <ProfileForm />
        </Suspense>
      ),
    },
    //PRODUCT ------------------------------------------------------------------

    {
      path: PATH_PRODUCTS,
      element: (
        <Suspense fallback={<p className="suspense_loading">Loading...</p>}>
          <Products />
        </Suspense>
      ),
    },
    {
      path: PATH_ADD_PRODUCTS,
      element: (
        <Suspense fallback={<p className="suspense_loading">Loading...</p>}>
          <ProductForm />
        </Suspense>
      ),
    },
    //ROM ------------------------------------------------------------------

    {
      path: PATH_ROMS,
      element: (
        <Suspense fallback={<p className="suspense_loading">Loading...</p>}>
          <ROMs />
        </Suspense>
      ),
    },
    {
      path: PATH_ADD_ROMS,
      element: (
        <Suspense fallback={<p className="suspense_loading">Loading...</p>}>
          <RomForm />
        </Suspense>
      ),
    },
    {
      path: PATH_EDIT_ROMS,
      element: (
        <Suspense fallback={<p className="suspense_loading">Loading...</p>}>
          <EditRom />
        </Suspense>
      ),
    },
    {
      path: PATH_LOGIN,
      element: (
        <Suspense fallback={<p className="suspense_loading">Loading...</p>}>
          <Login />
        </Suspense>
      ),
    },
  ];

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} timeout={300} classNames="fade">
        {useRoutes(routes)}
      </CSSTransition>
    </TransitionGroup>
  );
}

export default memo(Router);
