import { NavLink } from "react-router-dom"
import styles from "./index.module.scss"
const Header = () => {
    return (
        <header>
                <div className={styles["header"]}>
                    <h1>COLO<span>SHOP</span></h1>
                    <nav>
                        <ul>
                            <li>
                                <NavLink to={"/"}>Home</NavLink>
                            </li>
                            <li>
                                <NavLink to={"/wishlist"}>Wishlist</NavLink>
                            </li>
                            <li>
                                <NavLink to={"/add"}>Add</NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
         
        </header>
    )
}

export default Header