import { Model, Types } from "mongoose";
import { IAuthUsers } from "../auth/auth.interface";

export type ICowLocation =
     | "Dhaka"
     | "Chattogram"
     | "Barishal"
     | "Rajshahi"
     | "Sylhet"
     | "Comilla"
     | "Rangpur"
     | "Mymensingh";

export type ICowBreed =
     | "Brahman"
     | "Nellore"
     | "Sahiwal"
     | "Gir"
     | "Indigenous"
     | "Tharparkar"
     | "Kankrej";
export type ICowLebel = "for sale" | "sold out";

export type ICow = {
     name: string;
     age: number;
     price: number;
     location: ICowLocation;
     breed: ICowBreed;
     weight: number;
     label: ICowLebel;
     category: "Dairy" | "Beef" | "DualPurpose";
     seller: Types.ObjectId | IAuthUsers;
};

export type ICowModal = Model<ICow>;

export type ICowsFilters = {
     searchTerm?: string;
     minPrice?: string;
     maxPrice?: string;
     email?: string;
     location?: string;
};
