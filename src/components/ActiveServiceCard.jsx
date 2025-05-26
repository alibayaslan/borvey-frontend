import React from "react";
import { Link } from "react-router-dom";

const ServiceCard = ({ item }) => {
  return (
    <div className="s-card mt-4">
      <Link to={`/myservices/${item?._id}`} className="w-[100%]">
        <div className="s-card-content p-4 flex items-center ">
          <div>
            <div className="s-card-title">{item?.cargoType}</div>

            <div className="s-card-c">
              <i className="fa-regular fa-user"></i>{item?.fromLocation.city}<i class="fa-solid fa-arrow-right"></i>{item?.toLocation.city}
            </div>
          </div>
        
        </div>
      </Link>
    </div>
  );
};

export default ServiceCard;
