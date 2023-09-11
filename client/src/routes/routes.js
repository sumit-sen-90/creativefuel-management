import Dashboard from "../comnponents/Dashboard";
import Login from "../comnponents/Login";
import RootErrorBoundary from "./RootErrorBoundary";
import ProtectedRoute from "./ProtectedRoute";
import UserForm from "../comnponents/UserForm";

const routes = [
  {
    path: "/",
    element: <Login />,
    errorElement: <RootErrorBoundary />,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute path="/" element={<Dashboard />} />,
  },

  {
    path: "/user-form/:id?",
    element: <ProtectedRoute path="/" element={<UserForm />} />,
  },
];

export default routes;
