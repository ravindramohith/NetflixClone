import { ArrowBackOutlined } from "@material-ui/icons";
import { Link, useLocation, useParams } from "react-router-dom";
import "./watch.scss";
import axios from 'axios';
import { useState } from "react";

export default function Watch() {
    let { id } = useParams();
    const [video, setVideo] = useState(null);
    const getVideo = async () => {
        try {
            const res = await axios.get("/movies/find/" + id, {
                headers: {
                    token:
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzM2FmZDRiNGYzMzJlOTljNDBlMTA3ZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2NDg2MjUzMywiZXhwIjoxNjY1Mjk0NTMzfQ.UQdu3y6QtYiJb3dhyaY5-cWbYFhRLyIjPh5eW0p7Hz8",
                },
            })
            setVideo(res.data.video);
        } catch (err) {
            console.log(err);
        }
    }
    getVideo();
    return (
        <div className="watch">
            <Link to="/">
                <div className="back">
                    <ArrowBackOutlined />
                </div>
            </Link>
            <video
                className="video"
                autoPlay
                progress
                controls
                src={video}
            />
        </div>
    );
}