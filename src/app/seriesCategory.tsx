import CategoryCard from '@/components/categoryCard';

export default function SeriesCategorySection({ seriesCategoryData }: any) {
  const seriesCategoryDataShow = JSON.parse(seriesCategoryData);
  return (
    <div className="flex flex-col items-center gap-4 bg-black py-4 md:gap-6 md:py-8">
      <p className="text-3xl font-medium text-white md:text-5xl">All Series</p>
      <div className="mx-auto flex w-full max-w-7xl grid-cols-1 gap-6 overflow-x-scroll p-8 md:grid md:grid-cols-4 md:overflow-x-auto">
        {seriesCategoryDataShow.map((category: any, index: any) => (
          <CategoryCard key={index} category={category} />
        ))}
      </div>
    </div>
  );
}
