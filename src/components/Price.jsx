const Price = (props) => {
  // split price 1000 to k
  const formatter = (num) => {
    if (num == 0) {
      return "Gratis";
    } else if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(0) + "K";
    } else if (num > 1000000) {
      return (num / 1000000).toFixed(0) + "M";
    }
  };

  return (
    <div className="flex flex-col text-center text-black">
      <h3 className="text-xs text-[#3D37F1]">IDR</h3>
      <h2 className="font-bold text-xl">{formatter(props.price)}</h2>
    </div>
  );
};

export default Price;
