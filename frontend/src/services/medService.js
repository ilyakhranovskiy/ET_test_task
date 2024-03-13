import axios from "axios";

export const getAll = async () => {
  const { data } = await axios.get("/api/drugs");
  return data;
};

export const search = async (searchTerm) => {
  const { data } = await axios.get("/api/drugs/shop/" + searchTerm);
  return data;
};

export const getAllShops = async () => {
  const { data } = await axios.get("/api/drugs/shops");
  return data;
};
