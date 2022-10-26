import "./App.css";

import { Route, Routes } from "react-router-dom";
import Index from "./Pages/Index";
import Login from "./Pages/login-and-register/Login/Login";
import Register from "./Pages/login-and-register/Register/Register";
import NavbarComponent from "./Components/NavbarComponent/NavbarComponent";
import Home from "./Pages/Home/Home";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import ProductAdd from "./Pages/ProductAdd/ProductAdd";
import ProductList from "./Pages/ProductList/ProductList";
import Favorites from "./Pages/Favorites/Favorites";
import UserProfile from "./Pages/UserProfile/UserProfile";
import Category from "./Pages/Search/Category/Category";
import Messages from "./Pages/Messages/Messages";
import MessagesUser from "./Pages/Messages/MessagesUser/MessagesUser";
import ProductEdit from "./Pages/ProductEdit/ProductEdit";
import { useSelector } from "react-redux";
function App() {
  const { currentUser } = useSelector((state) => state.userInfoReducer);

  return (
    <div className="container mx-auto">
      <NavbarComponent />
      <div className=" px-0 lg:px-4">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Home />} />

          {currentUser && currentUser !== undefined ? (
            <>
              <Route path="/product/item/:id" element={<ProductDetails />} />
              <Route path="/product/item/list/:id" element={<ProductList />} />
              <Route path="/product/add" element={<ProductAdd />} />
              <Route
                path="/product/edit/:productid"
                element={<ProductEdit />}
              />

              <Route path="/user/:id" element={<UserProfile />} />
              <Route path="/search/category/:category" element={<Category />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/messages" element={<Messages />}>
                <Route path="user/:uid" element={<MessagesUser />} />
              </Route>
            </>
          ) : (
            <>
              <Route path="/signin" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          )}

          {/*Product*/}

          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
