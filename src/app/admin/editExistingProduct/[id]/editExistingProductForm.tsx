'use client';
import { CircleX } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const EditExistingProduct = ({ productDetailsStringify }: any) => {
  const productDetails = JSON.parse(productDetailsStringify);
  const router = useRouter();
  const [productHeadlines, setProductHeadlines] = useState<any>(
    productDetails.productHeadlines || []
  );
  const [newHeadline, setNewHeadline] = useState('');
  const [headlineAdded, setHeadlineAdded] = useState(false);
  const [formData, setFormData] = useState<any>({
    id: productDetails.id,
    name: productDetails.name,
    price: productDetails.price,
    discountPrice: productDetails.discountPrice,
    description: productDetails.description,
    productHeadlines: productHeadlines,
    series: productDetails.series,
    category: productDetails.category,
  });

  const SERIES = [
    'naruto',
    'one-piece',
    'demon-slayer',
    'dragon-ball-z',
    'marvel',
    'jujutsu-kaisen',
    'others',
  ];

  const CATEGORIES = [
    'action-figure',
    'miniature',
    'bobble-head',
    'q-posket',
    'keychain',
    'katana',
    'sets',
  ];

  const handleAddHeadline = () => {
    setHeadlineAdded(false);
    if (newHeadline.trim()) {
      setProductHeadlines((prevHeadlines: any) => [
        ...prevHeadlines,
        newHeadline.trim(),
      ]);
      setNewHeadline(''); // Clear input after adding
    }
  };

  function handelChange(e: any) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleFormSubmit(e: any) {
    e.preventDefault();

    try {
      const response = await fetch('/api/eidtExistingProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        router.push('/admin');
      } else {
        console.error('Error submitting form:', response.statusText);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  }

  function handleRemoveHeadline(index: number) {
    const newHeadlines = [...productHeadlines];
    newHeadlines.splice(index, 1);
    setProductHeadlines(newHeadlines);
  }

  return (
    <div className="py-16">
      <form
        method="POST"
        className="mx-auto flex w-full max-w-xl flex-col gap-4"
      >
        <input type="hidden" name="id" value={productDetails.id} />
        <label className="flex flex-col">
          <span className="mb-1 text-gray-700">Name</span>
          <input
            onChange={(e) => handelChange(e)}
            className="rounded-md border border-gray-300 px-2 py-1.5 outline-none"
            type="text"
            name="name"
            value={formData.name}
            placeholder="Enter product name"
          />
        </label>

        <label className="flex flex-col">
          <span className="mb-1 text-gray-700">Price</span>
          <input
            onChange={(e) => handelChange(e)}
            className="rounded-md border border-gray-300 px-2 py-1.5 outline-none"
            type="text"
            name="price"
            value={formData.price}
            placeholder="Enter price"
          />
        </label>

        <label className="flex flex-col">
          <span className="mb-1 text-gray-700">Discount Price</span>
          <input
            onChange={(e) => handelChange(e)}
            className="rounded-md border border-gray-300 px-2 py-1.5 outline-none"
            type="text"
            name="discountPrice"
            value={formData.discountPrice}
            placeholder="Enter discount price"
          />
        </label>

        <label className="flex max-w-xl flex-col">
          <span className="mb-1 text-gray-700">Product Headlines</span>
          <div className="flex">
            <input
              className="flex-grow rounded-md border border-gray-300 px-2 py-1.5 outline-none"
              type="text"
              value={newHeadline}
              onChange={(e) => setNewHeadline(e.target.value)} // Update local state
              placeholder="Enter product headline"
            />
            <button
              type="button"
              onClick={handleAddHeadline}
              className="ml-2 rounded bg-blue-500 px-4 py-1 text-center text-white"
            >
              Add
            </button>
          </div>
          <div className="mt-2 flex flex-col rounded-md border py-1">
            {productHeadlines.map((headline: string, index: number) => (
              <div key={index} className="flex justify-between gap-2 px-2 py-1">
                {headline}{' '}
                <p
                  onClick={() => handleRemoveHeadline(index)}
                  className="cursor-pointer text-gray-600"
                >
                  <CircleX />
                </p>
              </div>
            ))}
          </div>
          <div
            onClick={() => {
              setFormData({ ...formData, productHeadlines: productHeadlines });
              setHeadlineAdded(true);
            }}
            className={`mt-2 cursor-pointer rounded px-2 py-1.5 text-center font-medium ${headlineAdded ? 'bg-red-300 text-red-800' : 'bg-blue-300 text-blue-800'}`}
          >
            Add headline to product
          </div>
        </label>

        <label className="flex flex-col">
          <span className="mb-1 text-gray-700">Description</span>
          <textarea
            rows={6}
            onChange={(e) => handelChange(e)}
            className="rounded-md border border-gray-300 px-2 py-1.5 outline-none"
            name="description"
            value={formData.description}
            placeholder="Enter product description"
          />
        </label>
        <label className="flex flex-col">
          <span className="mb-1 text-gray-700">Series</span>
          <select
            onChange={(e) => handelChange(e)}
            className="rounded-md border border-gray-300 px-2 py-1.5 outline-none"
            name="series"
            value={formData.series}
          >
            <option value="">Select a series</option>
            {SERIES.map((series) => (
              <option key={series} value={series}>
                {series.charAt(0).toUpperCase() + series.slice(1)}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col">
          <span className="mb-1 text-gray-700">Category</span>
          <select
            onChange={(e) => handelChange(e)}
            className="rounded-md border border-gray-300 px-2 py-1.5 outline-none"
            name="category"
            value={formData.category}
          >
            <option value="">Select a category</option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </label>

        <div
          onClick={(e) => handleFormSubmit(e)}
          className="cursor-pointer rounded bg-red-200 px-2 py-1.5 text-center font-medium text-red-900"
        >
          Submit
        </div>
      </form>
    </div>
  );
};

export default EditExistingProduct;
