// import { axiosWithToken } from "../service/axiosInstance";
import useAxios from "./useAxios";
import { useDispatch } from "react-redux";
import {
  fetchFail,
  fetchStart,
  getSuccess,
  getProCatBrandsSuccess,
} from "../features/stockSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const useStockCalls = () => {
  const dispatch = useDispatch();
  const { axiosWithToken } = useAxios();

  //!------------------------- GET CALLS ---------------------------------------

  const getStockData = async (url) => {
    dispatch(fetchStart());
    // console.log("starting");
    try {
      const { data } = await axiosWithToken.get(`stock/${url}/`);
      dispatch(getSuccess({ data, url }));
      // console.log(data);
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const getFirms = () => getStockData("firms");
  const getBrands = () => getStockData("brands");
  const getCategories = () => getStockData("categories");
  const getProducts = () => getStockData("products");
  const getSales = () => getStockData("sales");

  const getProCatBrands = async () => {
    try {
      const [products, categories, brands] = await Promise.all(
        [axiosWithToken.get("stock/products/")],
        [axiosWithToken.get("stock/categories/")],
        [axiosWithToken.get("stock/brands/")]
      );

      dispatch(
        getProCatBrandsSuccess([products?.data, categories?.data, brands?.data])
      );
    } catch (error) {
      console.log(error);
    }
  };

  //!------------------------- DELETE CALLS ---------------------------------------

  const deleteStockData = async (url, id) => {
    try {
      await axiosWithToken.delete(`stock/${url}/${id}/`);
      toastSuccessNotify(`${url} successfuly deleted`);
      getStockData(url);
    } catch (error) {
      console.log(error);
      toastErrorNotify(`${url} error deleting stock`);
    }
  };

  const deleteFirm = (id) => deleteStockData("firms", id);
  const deleteBrand = (id) => deleteStockData("brands", id);
  const deleteProduct = (id) => deleteStockData("products", id);

  //!--------------------------- POST CALLS--------------------------------------------

  const postStockData = async (info, url) => {
    try {
      await axiosWithToken.post(`stock/${url}/`, info);
      toastSuccessNotify(`${url} successfuly added`);
      getStockData(url);
    } catch (error) {
      console.log(error);
      toastErrorNotify(`${url} error adding stock`);
    }
  };
  const postFirm = (info) => postStockData(info, "firms");
  const postBrand = (info) => postStockData(info, "brands");

  //!--------------------------- PUT CALLS--------------------------------------------

  const putStockData = async (info, url) => {
    try {
      await axiosWithToken.put(`stock/${url}/${info.id}/`, info);
      toastSuccessNotify(`${url} successfuly updated`);
      getStockData(url);
    } catch (error) {
      console.log(error);
      toastErrorNotify(`${url} error updating stock`);
    }
  };
  const putFirm = (info) => putStockData(info, "firms");
  const putBrand = (info) => putStockData(info, "brands");

  return {
    getFirms,
    getSales,
    getCategories,
    getProducts,
    getBrands,
    getProCatBrands,
    deleteFirm,
    deleteBrand,
    deleteProduct,
    postBrand,
    postFirm,
    putBrand,
    putFirm,
  };
};

export default useStockCalls;
