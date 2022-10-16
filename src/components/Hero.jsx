import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="hero -mt-20">
      <div className="hero-filter">
        <div className="pt-24 mx-28 grid md:grid-cols-12 md:items-center">
          <div className="md:col-span-7 sm:col-span-2">
            <img src="/images/hero-image.png" alt="banner" />
          </div>
          <div className="md:col-span-5 sm:col-span-2 text-white h-1/2">
            <h1 className="font-bold text-2xl">
              Cari Event yang Ada Di Indonesia <br />
              Dengan Mudah di Eventku
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
