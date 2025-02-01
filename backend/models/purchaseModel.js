import mongoose from 'mongoose';

const purchaseSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    purchaseDate: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Purchase = mongoose.model('Purcahse', purchaseSchema);
