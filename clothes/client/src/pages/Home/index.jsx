import { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../../constants";
import axios from "axios";
import styles from "./index.module.scss";
import Grid from '@mui/material/Grid2';
import { FaInfoCircle } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { WishlistContext } from "../../context/wishlistContext";

const Home = () => {
    const [clothes, setClothes] = useState([]);
    const [clothes2, setClothes2] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { toggleWishlist } = useContext(WishlistContext);

    const getClothes = async () => {
        try {
            const res = await axios(`${BASE_URL}clothes`);
            setClothes(res.data.data);
            setClothes2(res.data.data);
            setLoading(false);
        } catch (error) {
            setError("Failed to load clothes");
            setLoading(false);
        }
    };

    useEffect(() => {
        getClothes();
    }, []);

    const handleChange = (e) => {
        let sortedClothes = [...clothes];
        if (e.target.value === "asc") {
            sortedClothes.sort((a, b) => a.price - b.price);
        } else if (e.target.value === "desc") {
            sortedClothes.sort((a, b) => b.price - a.price);
        } else {
            sortedClothes = [...clothes2];
        }
        setClothes(sortedClothes);
    };

    const filteredClothes = clothes.filter(c =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase().trim())
    );

    return (
        <>
            <Helmet>
                <title>Home Page</title>
                <meta name="description" content="clothes page" />
            </Helmet>
            <div>
                {loading && <div>Loading...</div>}
                {error && <div>{error}</div>}
                

                <div className={styles.sec1}>
                    <div style={{marginTop:"50px",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",height:"70vh"}} className="text1">
                        <h1 >Get up to 30% Off 
                            <br />New Arrivals</h1>
                        <button style={{backgroundColor:"#FE7C7F",border:"none",borderRadius:"5px",padding:"20px",color:"white"}}>SHOP NOW</button>
                    </div>
                </div>

                <div className={styles.sec2}>
                    <Grid container spacing={2} >
                        <Grid style={{position:"relative"}}>
                            <img style={{}} src="https://preview.colorlib.com/theme/coloshop/images/banner_1.jpg" alt="" />
                            <span style={{position:"absolute",right:"70px",bottom:"100px",backgroundColor:"white",padding:"15px",fontSize:"30px",width:"270px"}}>WOMEN'S</span>
                        </Grid>
                        <Grid style={{position:"relative"}}>
                            <img style={{}} src="https://preview.colorlib.com/theme/coloshop/images/banner_2.jpg" alt="" />
                            <span style={{position:"absolute",right:"70px",bottom:"100px",backgroundColor:"white",padding:"15px",fontSize:"30px",width:"270px"}}>ACCESORIE'S</span>
                        </Grid>
                        <Grid style={{position:"relative"}}>
                            <img style={{}} src="https://preview.colorlib.com/theme/coloshop/images/banner_3.jpg" alt="" />
                            <span style={{position:"absolute",right:"70px",bottom:"100px",backgroundColor:"white",padding:"15px",fontSize:"30px",width:"270px"}}>MEN'S</span>
                        </Grid>
                    </Grid>
                </div>


                <div className="container">
                    <div style={{ margin: "1rem 0", display: "flex", justifyContent: "center" }}>
                        <input type="text" onChange={(e) => setSearchQuery(e.target.value)} />
                        <select name="" id="" onChange={handleChange}>
                            <option value="asc">ASC</option>
                            <option value="desc">DESC</option>
                            <option value="default">DEFAULT</option>
                        </select>
                    </div>

                    <div className={styles.clothes}>
                        <Grid container spacing={2}>
                            {filteredClothes.map(c => (
                                <Grid className={styles.card} size={{ xs: 12, md: 6, lg: 4 }} key={c._id}>
                                    <div style={{ display: "flex", justifyContent:"space-around"}}>
                                                <Link style={{color: "green",fontSize: "20px"}}  to={`clothes/${c._id}`}><FaInfoCircle /></Link>
                                                <FaRegHeart style={{color:"red",fontSize:"20px"}} onClick={() => toggleWishlist(c)} />
                                    </div>
                                    <div className={styles.clothe}>
                                    <img src={c.imageUrl} alt={c.title} />
                                    <h3 className={styles.title}>{c.title}</h3>
                                            <p style={{color:"red",fontSize:"23px"}}>${c.price}</p>
                                            
                                        
                                    </div>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                </div>

    
              <div className={styles.sec4}>
            <Grid container spacing={2}>
                <Grid style={{width:"300px",borderRight:"1px solid grey"}}>
                    <img src="https://preview.colorlib.com/theme/coloshop/images/product_4.png" alt="" />
                    <p style={{color:"grey"}}>DYMO LabelWriter 450 Turbo Thermal Label Printer</p>
                    <p style={{color:"red",fontSize:"20px"}}>$ 410</p>
                </Grid>
                <Grid style={{width:"300px",borderRight:"1px solid grey"}}>
                    <img src="https://preview.colorlib.com/theme/coloshop/images/product_9.png" alt="" />
                    <p style={{color:"grey"}}>DYMO LabelWriter 450 Turbo Thermal Label Printer</p>
                    <p style={{color:"red",fontSize:"20px"}}>$ 410</p>
                </Grid>
                <Grid style={{width:"300px", borderRight:"1px solid grey"}}>
                    <img src="https://preview.colorlib.com/theme/coloshop/images/product_5.png" alt="" />
                    <p style={{color:"grey"}}>DYMO LabelWriter 450 Turbo Thermal Label Printer</p>
                    <p style={{color:"red",fontSize:"20px"}}>$ 410</p>
                </Grid>
            </Grid>
              </div>

              <div className={styles.sec5}>
                <Grid style={{display:"flex", gap:"2rem"}}container spacing={2}>
                    <Grid>
                        <img src="https://preview.colorlib.com/theme/coloshop/images/blog_1.jpg" alt="" />
                    </Grid>
                    <Grid>
                        <img src="https://preview.colorlib.com/theme/coloshop/images/blog_2.jpg" alt="" />
                    </Grid>
                    <Grid>
                        <img src="https://preview.colorlib.com/theme/coloshop/images/blog_3.jpg" alt="" />
                    </Grid>
                    
                </Grid>


              </div>

              
            </div>
        </>
    );
};

export default Home;
