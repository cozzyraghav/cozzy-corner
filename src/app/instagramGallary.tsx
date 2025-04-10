import Link from 'next/link';

export default function InstagramGallary({ instagramGallaryData }: any) {
  const instagramGallaryDataShow = JSON.parse(instagramGallaryData);
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6">
      <p className="text-center text-5xl font-semibold text-white">
        Instagram Store
      </p>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-5">
        {instagramGallaryDataShow.map((item: any) => {
          return (
            <Link
              href={item.link}
              target="_blank"
              className="group cursor-pointer overflow-hidden border border-gray-500"
            >
              <img
                src={item.image}
                className="duration-200 group-hover:scale-105"
                alt=""
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
