import './home.scss'
import Navbar from '../../components/navbar/Navbar'
import Featured from '../../components/featured/Featured'
import List from '../../components/list/List'
import { useEffect, useState } from 'react'
import axios from 'axios';

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setgenre] = useState(null);
  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(`lists${type ? "?type=" + type : ""}${genre ? "&?genre=" + genre : ""}`, { headers: { token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzM2FmZDRiNGYzMzJlOTljNDBlMTA3ZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2NDg2MjUzMywiZXhwIjoxNjY1Mjk0NTMzfQ.UQdu3y6QtYiJb3dhyaY5-cWbYFhRLyIjPh5eW0p7Hz8" } });
        setLists(res.data);
      }
      catch (err) {
        console.log(err);
      }
    }
    getRandomLists();
  }, [type, genre]);
  return (
    <div className='home'><Navbar />
      <Featured type={type} setgenre={setgenre} />
      {lists.map((list) => (
        <List key={list._id} list={list} />
      ))}
    </div>
  )
}

export default Home