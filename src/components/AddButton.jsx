import { FaPlus } from "react-icons/fa";

const AddButton = (props) => {
  return (
    <button
      className={`bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-md flex items-center 
                  text-sm gap-2 text-white ${props.styling}`}
      onClick={props.action}
    >
      <span className="hidden md:block">{props.text}</span>
      <FaPlus />
    </button>
  );
};

export default AddButton;
