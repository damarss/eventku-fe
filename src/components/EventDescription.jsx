const EVentDescription = (props) => {
  return (
    <div className="text-black">
      <h3 className="font-bold text-sm">{props.title}</h3>
      <p className="text-xs mt-2">{props.description}</p>
    </div>
  );
};

export default EVentDescription;
