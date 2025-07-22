import { useEffect, useState } from 'react'
import "./NewCollections.css"
import Item from '../item/Item'

const API_BASE = import.meta.env.VITE_API_URL;

export default function NewCollections() {

  const [new_collection, setnew_collection] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/newcollection`)
    .then((res)=>res.json())
    .then((data)=>setnew_collection(data));
  }, [])
  

  return (
    <div className='new-collections'>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {new_collection.map((item,i)=>{
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_prices} old_price={item.old_prices}></Item>
        })}
      </div>
    </div>
  )
}
