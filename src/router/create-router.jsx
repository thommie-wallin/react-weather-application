import {
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import useGetRoutes from "../hooks/useGetRoutes";

const router = createBrowserRouter(createRoutesFromElements(useGetRoutes()));

export default router;
