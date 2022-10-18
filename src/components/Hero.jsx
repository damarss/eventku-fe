import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="hero -mt-20">
      <div className="hero-filter">
        <div className="pt-24 mx-5 md:mx-28 grid md:grid-cols-12 md:items-center">
          <div className="col-span-12 md:col-span-7">
            <img src="/images/hero-image.png" alt="banner" />
          </div>
          <div className="col-span-12 md:col-span-5 text-white h-1/2 md:w-11/12">
            <h1 className="font-bold text-2xl">
              Cari Event yang Ada Di Indonesia Dengan Mudah di Eventku
            </h1>
            <p className="mt-7">
              Jangan sampai ketinggalan! Cari event favoritmu di website ini dan
              rasakan pengalaman yang menyenangkan.
            </p>
            <button className="mt-7 py-3 px-7 font-semibold rounded-full bg-[#F5167E] hover:bg-[#c63176] transition ease-in-out duration-300">
              <Link to="/about">Pelajari Lebih Lanjut</Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
