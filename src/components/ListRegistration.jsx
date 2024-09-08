import { Empty } from "antd";
import { useState } from "react";

const ListRegistration = ({ openPopup, handleClose }) => {
  const [competitors, setCompetitors] = useState([]);
  const showHideClassName = openPopup
    ? "popup display-block"
    : "popup display-none";
  return (
    <div className={showHideClassName}>
      <section className="popup-main max-w-[600px] w-full">
        <h1>List Registration</h1>
        <button
          className="top-2 right-3 absolute text-3xl "
          onClick={handleClose}
        >
          &times;
        </button>
        {competitors.length > 0 ? (
          <ul>
            {competitors.map((competitor) => (
              <li key={competitor.id}>{competitor.fullName}</li>
            ))}
          </ul>
        ) : (
          <div className="mt-8">
            <Empty />
          </div>
        )}
      </section>
    </div>
  );
};
export default ListRegistration;
