import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CategoryCard({ category }: any) {
  return (
    <Link
      href={category.slug}
      className="group flex w-full max-w-56 shrink-0 cursor-pointer flex-col gap-3 overflow-hidden rounded-lg border border-gray-500 p-3 md:max-w-none"
    >
      <div className="relative block h-52 w-full overflow-hidden rounded-lg md:h-64">
        {/* <img
          src={category.image}
          className="h-full w-full duration-200 group-hover:scale-105"
          alt=""
        /> */}
        {/* <Image

          fill={true}
          className="object-contain"
        ></Image> */}

        <Image
          src={category.image}
          alt={category.name}
          // width={500}
          // height={500}
          className="object-cover"
          fill={true}
        ></Image>
      </div>
      <div className="flex items-center gap-2 px-2 text-xl font-semibold text-white duration-200 group-hover:gap-4">
        {category.name} <ArrowRight className="mt-1" size={20} />
      </div>
      <div className="h-4"></div>
    </Link>
  );
}
