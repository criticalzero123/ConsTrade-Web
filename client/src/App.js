import "./App.css";

import { Route, Routes, Link, useParams } from "react-router-dom";
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
import ProductMessages from "./Pages/Messages/ProductMessages";
import ProductMessagesUser from "./Pages/Messages/MessagesUser/ProductMessagesUser";
import ProductEdit from "./Pages/ProductEdit/ProductEdit";
import UserMessages from "./Pages/Messages/UserMessages";
import PersonalMessagesUser from "./Pages/Messages/MessagesUser/PersonalMessagesUser";
import ProductCategory from "./Pages/ProductCategory/ProductCategory";
import SearchGenre from "./Pages/Search/Genre/SearchGenre";
import SearchPlatform from "./Pages/Search/Platform/SearchPlatform";
import AllUser from "./Pages/Temp/AllUser/AllUser";
import Transactions from "./Pages/Temp/Transactions/Transactions";
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
              <Route path="/user/:id" element={<UserProfile />} />
              <Route path="/favorites" element={<Favorites />} />
              {/* Product */}
              <Route path="/product/item/:id" element={<ProductDetails />} />
              <Route path="/product/item/list/:id" element={<ProductList />} />
              <Route path="/product/add" element={<ProductAdd />} />
              <Route
                path="/product/edit/:productid"
                element={<ProductEdit />}
              />
              <Route
                path="/product/category/:search"
                element={<ProductCategory />}
              />

              {/* Messages */}
              <Route path="/messages/product" element={<ProductMessages />}>
                <Route
                  path=":productId/:uid"
                  element={<ProductMessagesUser />}
                />
              </Route>
              <Route path="/messages/user" element={<UserMessages />}>
                <Route path=":uid" element={<PersonalMessagesUser />} />
              </Route>
              {/* Search */}
              <Route
                path="/search/platform/:platform"
                element={<SearchPlatform />}
              />
              <Route path="/search/genre/:genre" element={<SearchGenre />} />
            </>
          ) : (
            <>
              <Route path="/signin" element={<Login />} />
              <Route path="/signup" element={<Register />} />
              <Route
                path="/product/item/:id"
                element={<ProductDetailWrapperNoUser />}
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

          {/* Temporary */}
          <Route path="/api/users/getAllUser" element={<AllUser />} />
          <Route
            path="/api/transactions/getAllTransaction"
            element={<Transactions />}
          />
        </Routes>
      </div>
    </div>
  );
}

const ProductDetailWrapperNoUser = () => {
  const { id } = useParams();
  return (
    <main style={{ padding: "1rem" }}>
      <p>
        Please login to access.{" "}
        <Link
          to="/signin"
          className="text-red-500"
          state={{ next: `/product/item/${id}` }}
        >
          Login Here!
        </Link>
      </p>
    </main>
  );
};

export default App;
