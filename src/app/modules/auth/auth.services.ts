import { IAuthUsers } from "./auth.interface";
import { User } from "./auth.models";

const createUser = async (paylode: IAuthUsers): Promise<IAuthUsers> => {
     const result = await User.create(paylode);
     return result;
};

export const AuthUserServices = {
     createUser,
};
