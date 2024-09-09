import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

function AppContainer(props) {
  return (
    <div>
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/products">Products</Link>
                    </li>
                    <li>Wishlist</li>
                    <li>Cart</li>
                </ul>
            </nav>
        </header>
        {props.children}
    </div>
  )
}
AppContainer.propTypes = {
    children: PropTypes.node.isRequired,
}
export default AppContainer
