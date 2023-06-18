import { ICowBreed, ICowLocation } from "./cow.interface";

export const cowLocation: ICowLocation[] = [
     "Dhaka",
     "Chattogram",
     "Barishal",
     "Rajshahi",
     "Sylhet",
     "Comilla",
     "Rangpur",
     "Mymensingh",
];

export const cowBreed: ICowBreed[] = [
     "Brahman",
     "Nellore",
     "Sahiwal",
     "Gir",
     "Indigenous",
     "Tharparkar",
     "Kankrej",
];

export const cowLebel = ["for sale", "sold out"];

export const cowSearchingFields = ["location", "breed", "category"];

export const cowFilterableFields = [
     "query",
     "minPrice",
     "maxPrice",
     "email",
     "location",
];
