import React from "react";
import {Link} from "react-router-dom";

const ServiceCard = ({item, id}) => {
  return (
    <div className="s-card w-full mt-4">
          <Link to={`/offers/${id}`} className="w-[100%]">
      <div className="s-card-content p-4 flex items-center ">
        <div>
        <div className="s-card-title">{item?.cargoType}</div>
        <div className="s-card-c">
          <i className="fa-regular fa-user"></i> {item?.fromLocation.city}<i class="fa-solid fa-arrow-right"></i>{item?.toLocation.city}
        </div>
        </div>
        <a href="#" className="chat-btn">
          <i class="fa-solid fa-info"></i>
        </a>
      </div>
      </Link>
    </div>
  );
};

export default ServiceCard;
