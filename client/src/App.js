import "./App.css";

import { Route, Routes, Link } from "react-router-dom";
import { useSelector } from "react-redux";
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
import ProductMessages from "./Pages/Messages/ProductMessages";
import ProductMessagesUser from "./Pages/Messages/MessagesUser/ProductMessagesUser";
import ProductEdit from "./Pages/ProductEdit/ProductEdit";
import UserMessages from "./Pages/Messages/UserMessages";
import PersonalMessagesUser from "./Pages/Messages/MessagesUser/PersonalMessagesUser";
function App() {
  const { currentUser } = useSelector((state) => state.userInfoReducer);

  return (
    <div>
      <NavbarComponent />
      <div>
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
              <Route path="/messages/product" element={<ProductMessages />}>
                <Route
                  path=":productId/:uid"
                  element={<ProductMessagesUser />}
                />
              </Route>
              <Route path="/messages/user" element={<UserMessages />}>
                <Route path=":uid" element={<PersonalMessagesUser />} />
              </Route>
            </>
          ) : (
            <>
              <Route path="/signin" element={<Login />} />
              <Route path="/signup" element={<Register />} />
              <Route
                path="/product/item/:id"
                element={
                  <main style={{ padding: "1rem" }}>
                    <p>
                      Please login to access here.{" "}
                      <Link to="/signin" className="text-red-500">
                        Login Here!
                      </Link>
                    </p>
                  </main>
                }
              />
            </>
          )}

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
