import { sample_med, sample_shops } from "../data";

export const getAll = async () => sample_med;

export const search = async (searchTerm) =>
  sample_med.filter((item) =>
    item.shops.toLowerCase().includes(searchTerm.toLowerCase())
  );

export const getAllShops = async () => sample_shops;

// export const getAllByShop = async (shop) => {
// //   if (shop === "All") return getAll();
//   return sample_shops.filter((item) => item.name?.includes(shop));
// };
