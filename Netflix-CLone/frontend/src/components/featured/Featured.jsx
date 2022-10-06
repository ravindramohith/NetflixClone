import { InfoOutlined } from "@material-ui/icons";
import axios from "axios";
import { useState, useEffect } from "react";
import { MdPlayArrow } from 'react-icons/md';
import "./featured.scss";

export default function Featured({ type,setgenre }) {
    const [content, setContent] = useState({});

    useEffect(() => {

        const getRandom = async () => {
            try {
                const res = await axios.get(`/movies/random?type=${type}`, { headers: { token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzM2FmZDRiNGYzMzJlOTljNDBlMTA3ZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2NDg2MjUzMywiZXhwIjoxNjY1Mjk0NTMzfQ.UQdu3y6QtYiJb3dhyaY5-cWbYFhRLyIjPh5eW0p7Hz8" } });
                setContent(res.data[0]);
            } catch (err) {
                console.log(err);
            }
        };
        getRandom();
    }, [type]);

    return (
        <div className="featured">
            {type && (
                <div className="category">
                    <span>{type === "movie" ? "Movies" : "Series"}</span>
                    <select name="genre" id="genre" onChange={e=>{setgenre(e.target.value)}}>
                        <option>Genre</option>
                        <option value="adventure">Adventure</option>
                        <option value="comedy">Comedy</option>
                        <option value="crime">Crime</option>
                        <option value="fantasy">Fantasy</option>
                        <option value="historical">Historical</option>
                        <option value="horror">Horror</option>
                        <option value="romance">Romance</option>
                        <option value="sci-fi">Sci-fi</option>
                        <option value="thriller">Thriller</option>
                        <option value="western">Western</option>
                        <option value="animation">Animation</option>
                        <option value="drama">Drama</option>
                        <option value="documentary">Documentary</option>
                    </select>
                </div>
            )}
            <img src={content.img} alt="" />
            <div className="info">
                <img src={content.imgTitle} alt="" />
                <span className="desc">{content.desc}</span>
                <div className="buttons">
                    <button className="play">
                        <MdPlayArrow />
                        <span>Play</span>
                    </button>
                    <button className="more">
                        <InfoOutlined />
                        <span>Info</span>
                    </button>
                </div>
            </div>
        </div>
    );
}