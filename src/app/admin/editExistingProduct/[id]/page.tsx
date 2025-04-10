import connect from '@/dbConfig/dbConfig';
import Product from '@/Models/productModel';
import React from 'react';
import EditExistingProduct from './editExistingProductForm';

const EditProduct = async (context: any) => {
  const router = context.params;
  await connect();
  const [data] = await Product.find({ id: router.id });
  return (
    <div>
      <EditExistingProduct productDetailsStringify={JSON.stringify(data)} />
    </div>
  );
};

export default EditProduct;
