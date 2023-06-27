import { SortOrder } from "mongoose";
import calculatePagination from "../../../helpers/paginationhelpers";
import { IPagenaionOptions } from "../../../interfaces/pagination";
import { cowSearchingFields } from "./cow.constance";
import { ICow, ICowsFilters } from "./cow.interface";
import { Cow } from "./cow.model";

const createUser = async (paylode: ICow): Promise<ICow | any> => {
     const result = await Cow.create(paylode);
     return result;
};

const getCows = async (
     filters: ICowsFilters,
     pageinationOptions: IPagenaionOptions
) => {
     // const { query, ...filtersData } = filters;
     const { searchTerm, minPrice, maxPrice, ...filtersData } = filters;

     const andCondation = [];

     if (searchTerm) {
          andCondation.push({
               $or: cowSearchingFields.map((field) => ({
                    [field]: { $regex: searchTerm, $options: "i" },
               })),
          });
     }
     if (minPrice) {
          andCondation.push({
               price: {
                    $gte: Number(minPrice),
               },
          });
     }
     if (maxPrice) {
          andCondation.push({
               price: {
                    $lte: Number(maxPrice),
               },
          });
     }

     if (Object.keys(filtersData).length) {
          andCondation.push({
               $and: Object.entries(filtersData).map(([field, value]) => ({
                    [field]: value,
               })),
          });
     }

     const { page, limit, skip, sortBy, sortOrder } =
          calculatePagination(pageinationOptions);

     const sortCondations: { [key: string]: SortOrder } = {};

     if (sortBy && sortOrder) {
          sortCondations[sortBy] = sortOrder;
     }
     const requestCondetion =
          andCondation.length > 0 ? { $and: andCondation } : {};

     const result = await Cow.find(requestCondetion)
          .populate("seller")
          .sort(sortCondations)
          .skip(skip)
          .limit(limit);

     const total = await Cow.countDocuments(requestCondetion);
     return {
          meta: {
               page,
               limit,
               total,
          },
          data: result,
     };
};
const getSingleCow = async (id: string): Promise<ICow | null> => {
     const result = await Cow.findById(id);

     return result;
};

const updateCowById = async (
     id: string,
     paylode: ICow
): Promise<ICow | any> => {
     console.log(id);

     const result = await Cow.findOneAndUpdate({ _id: id }, paylode, {
          new: true,
     });
     return result;
};

const deleteCowById = async (id: string): Promise<ICow | null> => {
     const result = await Cow.findByIdAndDelete(id).populate("seller");
     return result;
};

export const CowServices = {
     createUser,
     getCows,
     getSingleCow,
     updateCowById,
     deleteCowById,
};
