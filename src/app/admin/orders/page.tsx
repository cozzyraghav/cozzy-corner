import connect from '@/dbConfig/dbConfig';
import OrderModel from '@/Models/orderModel';
import React from 'react';
import ListAllTheOrders from './listAllTheOrders';

export const revalidate = 0;

const Orders = async () => {
  await connect();
  const orderDataString = await OrderModel.find({});
  return (
    <div>
      <ListAllTheOrders orderDataString={JSON.stringify(orderDataString)} />
    </div>
  );
};

export default Orders;
