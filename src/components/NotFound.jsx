import React from 'react'
import {Link} from "react-router-dom";
const NotFound = () => {
  return (
    <div className="my-[100px] flex flex-col justify-center items-center">
      <p>Sayfa bulunamadı</p>
      <Link className="bg-blue-400 text-white py-2 px-4 mt-2" to="/">Geriye dön</Link>
    </div>
  )
}

export default NotFound