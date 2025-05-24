import React from "react";
import {Link} from "react-router-dom";
const Tab = () => {
  return (
    <div className="bg-[#F5F5F5] product-filter-container">
      <div className="product-filter">
        <Link className="h-pro w-[50%]" to="/myservices/active">
          <span>Aktif Hizmetler</span>
          <br />
        </Link>
        <Link className="h-pro2 w-[50%]" to="/myservices/past">
          <span>Verdiğim Hizmetler</span>
          <br />
        </Link>
      </div>
    </div>
  );
};

export default Tab;
