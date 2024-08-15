const ActionButton = ({ icon, onClick }) => {
  return (
    <button className="action-btn" onClick={onClick}>
      <img src={icon} alt="icon" className="w-[24px] h-[24px] object-contain" />
    </button>
  );
};

export default ActionButton;
