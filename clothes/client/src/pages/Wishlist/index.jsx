import { useContext } from "react";

import Grid from '@mui/material/Grid2';
import styles from "./index.module.scss"
import { FaInfoCircle } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { WishlistContext } from "../../context/wishlistContext";



const Wishlist = () => {



    const { wishlist, toggleWishlist } = useContext(WishlistContext)






    return (

        <>
            <Helmet>
                <title>Wishlist</title>
                <meta name="description" content="clothes page" />
            </Helmet>
            <div>


                <div className="container">


                    <div className={styles.clothes}>
                        <Grid container spacing={2}>
                            {
                                wishlist.length > 0 && wishlist.map((c) => {
                                    return (<Grid size={{ xs: 12, md: 6, lg: 4 }} key={c._id}>
                                        <div className={styles["clothes"]}>
                                            <img src={c.imageUrl} alt={c.title} />
                                            <h3 className={styles.title}>{c.title}</h3>
                                            <p>  $ {c.price}</p>
                                            <div style={{ display: "flex", gap: "1rem" }}>
                                                <FaRegHeart onClick={() => { toggleWishlist(c) }} />
                                            </div>
                                        </div>
                                    </Grid>)
                                })
                            }
                        </Grid>
                    </div>

                </div>
            </div>
        </>

    )
}

export default Wishlist