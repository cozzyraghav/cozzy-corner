import mongoose from 'mongoose';

const orderDetailsSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    orderDetails: [orderDetailsSchema],
    extraCharge: {
      type: String,
      required: true,
      default: 0,
    },
    discountedPrice: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: 'pending',
    },
    phishingActivity: {
      type: String,
      required: true,
      default: 'no',
    },
    isGiftWrap: {
      type: Boolean,
      default: false,
    },
    isCOD: {
      type: Boolean,
      default: false,
    },
    transactionId: {
      type: String,
      default: '',
    },
    couponCode: {
      type: String,
    },
    couponApplied: {
      type: Boolean,
    },
    paymentOrderID: String,
    paymentAmount: Number,
    paymentStatus: String,
  },
  {
    timestamps: true,
  }
);

const OrderModel =
  mongoose.models.Order || mongoose.model('Order', orderSchema);
export default OrderModel;

// const order = await OrderModel.findById(orderId).populate('orderDetails.product');
