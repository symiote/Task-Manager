import React, { useEffect, useState } from 'react'
import Cards from '../components/home/Cards'
import axios from 'axios';

const ImportantTask = () => {
   const [Data, setData] = useState("")

   const headers = {
      id: localStorage.getItem("id"),
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
  
    useEffect(() => {
      const fetch = async () => {
        const response = await axios.get(
          "http://localhost:4000/api/v2/get-imp-tasks",
          { headers }
        );
        setData(response.data.data);
      };
      fetch();
    },);


  return (
    <div>
     {Data && <Cards home={false} data={Data}   />}
    </div>
  )
}

export default ImportantTask
