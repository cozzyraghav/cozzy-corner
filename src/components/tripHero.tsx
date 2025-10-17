function HeroBG({ text, img = null }: any) {
  return (
    <div className=" w-full h-full relative">
      <div className=" w-full relative h-full">
        <div className=" w-full h-full absolute top-0 left-0 bg-black opacity-70 md:opacity-70"></div>
        <img
          src={img || "./trip-hero-bg.jpg"}
          alt="trip-hero-bg"
          className=" w-full h-full object-cover min-h-[50vh] md:min-h-[60vh]"
        />
      </div>
      <p className=" text-gray-100 tracking-wide leading-12 md:leading-24 text-4xl w-full max-w-6xl md:text-6xl font-medium absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center p-4">
        {text}
      </p>
      <img
        src="./trip-hero-bottom.png"
        className=" absolute bottom-0 left0"
        alt=""
      />
    </div>
  );
}

export default HeroBG;
