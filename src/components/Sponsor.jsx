const Sponsor = () => {
  return (
    <section className="flex flex-col mb-28 px-4 items-center">
      <h1 className="font-bold text-3xl">Gabung menjadi sponsor kami</h1>
      <p className="mt-4 md:w-6/12 text-center text-sm">
        Kami dengan senang hati menerima kerja sama dengan pihak lain. Di bawah
        ini hanya sebagian dari sponsor kami
      </p>

      <div className="mt-14 flex flex-wrap justify-center items-center gap-5 w-full md:w-9/12">
        <img src="/images/spotify.png" alt="spotify" className="w-1/6 block h-fit" />
        <img src="/images/88rising.png" alt="88rising" className="w-1/6 block h-fit" />
        <img src="/images/stripe.png" alt="stripe" className="w-1/6 block h-fit" />
        <img src="/images/jyp.png" alt="jyp" className="w-1/6 block h-fit" />
        <img src="/images/yoasobi.png" alt="yoasobi" className="w-1/6 block h-fit" />
        <img src="/images/youtube.png" alt="youtube" className="w-1/6 block h-fit" />
        <img src="/images/kidzania.png" alt="kidzania" className="w-1/6 block h-fit" />
        <img src="/images/timezone.png" alt="timezone" className="w-1/6 block h-fit" />
        <img src="/images/figma.png" alt="figma" className="w-1/6 block h-fit" />
      </div>
    </section>
  );
};

export default Sponsor;
