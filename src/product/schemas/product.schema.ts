import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/auth/schemas/user.schema";

export enum Category {
  SHOES = 'shoes',
  JACKETS = 'jackets',
  CREWNECK = 'crewneck',
  BAGS = 'bags',
  SWEATERS = 'sweaters',
  ACCESSORIES = 'accessories',
  SHIRTS = 'shirts',
  WEAR = 'wear',
  TEES = 'tees'
}

export enum Size {
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL'
}

@Schema({
  timestamps: true
})

export class Product {
  @Prop({ unique: [true, 'Product already exists']})
  title: string;

  @Prop()
  images: string[]

  @Prop()
  description: string;

  @Prop({ default: 0 })
  price: number;

  @Prop({ type: String, enum: Object.values(Category)})
  category: Category

  @Prop({ type: [String], enum: Object.values(Size) })
  size: Size[];

  @Prop({ default: 0 })
  numReviews: number

  @Prop({ default: 0})
  countInStock: number

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  user: User

}


export const ProductSchema = SchemaFactory.createForClass(Product);

