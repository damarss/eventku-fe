const Tanggal = (props) => {
  return (
    <div className="flex flex-col text-center text-black">
      <h3 className="text-xs text-[#3D37F1]">{props.bulan}</h3>
      <h2 className="font-bold text-3xl">{props.tanggal}</h2>
    </div>
  );
};

export default Tanggal;
