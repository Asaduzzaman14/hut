import { IAdminInterface } from "./admin.interfce";
import { Admin } from "./admin.model";

const createAdmin = async (paylode: IAdminInterface) => {
  const result = await Admin.create(paylode);
  return result;
};

export const AdminServices = {
  createAdmin,
};
