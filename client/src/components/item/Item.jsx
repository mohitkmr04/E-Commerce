import React from 'react'
import "./Item.css"
import { Link } from 'react-router-dom'

export default function Item(props) {
  const url="https://e-commerce-2-0zxi.onrender.com"
  return (
    <div className='item'>
      <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0,0)} src={url+'/images/'+props.image} alt="" /></Link>
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price-new">
            ${props.new_price}
        </div>
        <div className="item-price-old">
            ${props.old_price}
        </div>
      </div>
    </div>
  )
}
