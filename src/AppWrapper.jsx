import { Outlet } from "react-router-dom";
// import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

function AppWrapper() {
  return (
    <main>
      <aside>
        <div className="asidebar">
          <div>
                <NavLink
                    to="/products"
                    end
                    className={({ isActive, isPending }) =>
                      `side-item side-btn ${isPending ? "pending" : isActive ? "active" : ""}`
                    }
                    style={({ isActive }) => ({
                      textDecoration: 'none',
                      color: isActive ? 'rgb(69, 69, 69)' : 'rgb(248, 248, 248)',
                      backgroundColor: isActive ? '#9eebcf' : 'transparent',
                      fontWeight:''
                    })}
                  >
                  Products
                </NavLink>

                <NavLink
                    to="/products/wishlist"
                    className={({ isActive, isPending }) =>
                      `side-item side-btn ${isPending ? "pending" : isActive ? "active" : ""}`
                    }
                    style={({ isActive }) => ({
                      textDecoration: 'none',
                      color: isActive ? 'rgb(69, 69, 69)' : 'rgb(248, 248, 248)',
                      backgroundColor: isActive ? '#9eebcf' : 'transparent',
                    })}
                  >
                  Wishlist
                </NavLink>

                <NavLink
                    to="/products/cart"
                    className={({ isActive, isPending }) =>
                      `side-item side-btn ${isPending ? "pending" : isActive ? "active" : ""}`
                    }
                    style={({ isActive }) => ({
                      textDecoration: 'none',
                      color: isActive ? 'rgb(69, 69, 69)' : 'rgb(248, 248, 248)',
                      backgroundColor: isActive ? '#9eebcf' : 'transparent',
                    })}
                  >
                  Cart
                </NavLink>
          </div>
            {/* <Link to={"/products"} className='side-item side-btn'>Products</Link>
            <Link to={"/products/wishlist"} className='side-item side-btn'>Wishlist</Link>
            <Link to={"/products/cart"} className='side-item side-btn'>Cart</Link> */}
        </div>
      </aside>
      <section className="section_main">
          <Outlet />
      </section>
    </main>
  )
}

export default AppWrapper;

