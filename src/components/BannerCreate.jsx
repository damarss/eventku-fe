const BannerCreate = () => {
  return (
    <section className="grid grid-cols-12 my-10 mt-44 mb-32 px-4 md:px-32 bg-[#EEE1FF] md:h-52 justify-center items-center">
      <div className="col-span-12 md:col-span-6 mt-1">
        <img
          src="/images/consultant.jpg"
          alt="consultant"
          className="block w-max object-cover relative -top-20"
        />
      </div>
      <div className="col-span-12 md:col-span-6 relative -top-14 mt-6">
        <div className="flex flex-col justify-center items-start h-3/5">
          <h1 className="text-2xl font-bold text-left">
            Buat Event Anda Sendiri
          </h1>
          <p className="mt-2">
            Anda dapat mengajukan event anda sendiri dengan mengisi form dibawah
            ini
          </p>
          <button className="bg-[#F5167E] hover:bg-[#c63176] hover:shadow-xl text-white px-10 text-sm py-3 rounded-full mt-4 shadow-md">
            Ajukan Event
          </button>
        </div>
      </div>
    </section>
  );
};

export default BannerCreate;
