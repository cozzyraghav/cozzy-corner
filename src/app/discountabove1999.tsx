export default function DiscountAbove1999() {
  return (
    <section className="flex items-center justify-center bg-black px-8 py-16">
      <div className="container mx-auto flex flex-col items-center justify-between gap-16 md:flex-row md:gap-8">
        {/* Image Section */}
        <div className="h-fit md:mt-0 md:w-1/2">
          <img
            src="https://s3.ap-south-1.amazonaws.com/cozzy.corner/discount-1999.png" // Replace with your promotional image URL
            alt="10% Discount Promotion"
            className="h-full w-full rounded-lg object-contain"
          />
        </div>
        <div className="text-centerflex max-w-xl flex-col items-center justify-center gap-4 md:w-1/2 md:px-4 md:text-left">
          <h2 className="mb-4 text-center text-4xl font-medium text-gray-50">
            Unlock 10% Off!
          </h2>
          <p className="mb-6 text-center text-lg text-gray-200">
            Spend ₹2000 or more and enjoy a 10% discount on your purchase! Take
            advantage of this special offer and save on your favorite items.
          </p>
        </div>
      </div>
    </section>
  );
}
