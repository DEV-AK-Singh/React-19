import { Route, Routes, Link, Outlet, useParams, NavLink } from "react-router";

const ContactElement = () => {
  const { id } = useParams();
  return (
    <>
      <h1>Contact Element : {id}</h1>
    </>
  );
};

export default function Router() {
  return (
    <>
      {/* <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/contact">Contact</Link> */}
      <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
        Home
      </NavLink>{" "}
      |{" "}
      <NavLink
        to="/about"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        About
      </NavLink>{" "}
      |{" "}
      <NavLink
        to="/contact"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Contact
      </NavLink>{" "}
      <br />
      <Outlet />
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route
          path="/contact"
          element={
            <div>
              {/* Contact : <Link to="/contact/1">Contact 1</Link> |{" "}
              <Link to="/contact/2">Contact 2</Link> |{" "}
              <Link to="/contact/3">Contact 3</Link> <br /> <Outlet /> */}
              Contact : <NavLink to="/contact/1" className={({ isActive }) => (isActive ? "active" : "")}>Contact 1</NavLink> |{" "}
              <NavLink to="/contact/2" className={({ isActive }) => (isActive ? "active" : "")}>Contact 2</NavLink> |{" "}
              <NavLink to="/contact/3" className={({ isActive }) => (isActive ? "active" : "")}>Contact 3</NavLink> <br /> <Outlet />
            </div>
          }
        >
          <Route index element={<h1>Contact</h1>} />
          <Route path=":id" element={<ContactElement />} />
        </Route>
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </>
  );
}
