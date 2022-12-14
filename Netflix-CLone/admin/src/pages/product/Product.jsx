import { Link, useLocation, useParams } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import { productData } from "../../dummyData"
import { Publish } from "@material-ui/icons";
import axios from 'axios';
import { useState } from "react";

export default function Product() {
    const { id } = useParams()
    const [movie, setMovie] = useState({});
    const getVideo = async () => {
        try {
            const res = await axios.get("/movies/find/" + id, {
                headers: {
                    token:
                        "Bearer " + JSON.parse(localStorage.getItem("user")).accesstoken,
                },
            })
            setMovie(res.data);
        } catch (err) {
            console.log(err);
        }
    }
    getVideo();
    return (
        <div className="product" >
            <div className="productTitleContainer">
                <h1 className="productTitle">Movie</h1>
                <Link to="/newproduct">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopLeft">
                    <Chart data={productData} dataKey="Sales" title="Views Stats" />
                </div>
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={movie?.img} alt="" className="productInfoImg" />
                        <span className="productName">{movie?.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">id:  </span>
                            <span className="productInfoValue">{movie._id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">rating:</span>
                            <span className="productInfoValue">{movie.rating}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Age Limit:</span>
                            <span className="productInfoValue">{movie.limit}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">in stock:</span>
                            <span className="productInfoValue">no</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>Product Name</label>
                        <input type="text" placeholder="Apple AirPod" />
                        <label>In Stock</label>
                        <select name="inStock" id="idStock">
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                        <label>Active</label>
                        <select name="active" id="active">
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="productUploadImg" />
                            <label for="file">
                                <Publish />
                            </label>
                            <input type="file" id="file" style={{ display: "none" }} />
                        </div>
                        <button className="productButton">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
