import React from "react";
const AnnouncementCard = ({ item }) => {
  return (
    <div className="s-card relative min-h-[150px]">
      <div className="p-4">
        <div className="s-card-title">{item?.cargoType}</div>
        <div className="s-card-c pt-4">
          <i className="fa-regular fa-user"></i>{item?.fromLocation.city}<i class="fa-solid fa-arrow-right"></i>{item?.toLocation.city}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;
