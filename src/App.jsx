import { Home, UserCog, UserPlus } from "lucide-react";
import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Creation from "./components/Forms/Creation";
import Login from "./components/Forms/Login";
import Register from "./components/Forms/Register";
import HomePage from "./components/HomePage/HomePage";
import Loader from "./components/Layout/Loader";
import PageNotFound from "./components/Layout/PageNotFound"; // Import your custom 404 component
import Sidebar, { SidebarItem } from "./components/Layout/Sidebar";
import Wrapper from "./components/Utils/Wrapper";
import AuthContext from "./store/auth-context";

const App = () => {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && <Routes>
        {!isLoggedIn.state && <Route index element={<Login />} />}
        {!isLoggedIn.state && <Route path="register" element={<Register />} />}
        {isLoggedIn.state && (
          <Route
            path="*"
            element={
              <main className="flex">
                <Sidebar>
                  <SidebarItem
                    icon={<Home size={20} />}
                    title="Home"
                    path="/"
                  />
                  <SidebarItem
                    icon={<UserPlus size={20} />}
                    title="Create"
                    path="create"
                  />
                  <SidebarItem
                    icon={<UserCog size={20} />}
                    title="Manage"
                    path="manage"
                  />
                </Sidebar>
                <Wrapper>
                  <Routes>
                    <Route
                      index
                      element={<HomePage heading="All Students" />}
                    />
                    <Route
                      path="/create"
                      element={<Creation heading="Create Student" />}
                    />
                    <Route
                      path="/manage"
                      element={
                        <HomePage heading="Manage Student" edit filter />
                      }
                    />
                    <Route path="*" element={<PageNotFound />} />
                  </Routes>
                </Wrapper>
              </main>
            }
          />
        )}
        <Route path="*" element={<PageNotFound />} />
      </Routes>}
    </>
  );
};

export default App;
