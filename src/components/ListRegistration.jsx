const ListRegistration = ({ openPopup, handleClose, competitors }) => {
  console.log(competitors);
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
        <ul>
          {competitors.map((competitor) => (
            <li key={competitor.id}>{competitor.fullName}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};
export default ListRegistration;
