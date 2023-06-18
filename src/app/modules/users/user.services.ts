import { IGenericResponse } from "../../../interfaces/common";
import { User } from "../auth/auth.models";
import { IAuthUsers } from "../auth/auth.interface";

const getAllUsers = async (): Promise<IGenericResponse<IAuthUsers[]>> => {
     const result = await User.find();

     return {
          data: result,
     };
};

const updateUser = async (
     id: string,
     paylode: IAuthUsers
): Promise<IAuthUsers | any> => {
     console.log(id);

     const result = await User.findOneAndUpdate({ _id: id }, paylode, {
          new: true,
     });
     return result;
};

const getSingleUser = async (id: string): Promise<IAuthUsers | null> => {
     const result = await User.findById(id);

     return result;
};

const deleteUser = async (id: string): Promise<IAuthUsers | null> => {
     const result = await User.findByIdAndDelete({ _id: id });
     return result;
};

export const UserServices = {
     getAllUsers,
     updateUser,
     getSingleUser,
     deleteUser,
};
