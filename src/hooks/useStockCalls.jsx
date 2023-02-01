// import { axiosWithToken } from "../service/axiosInstance";
import useAxios from "./useAxios";
import { useDispatch } from "react-redux";
import { fetchFail, fetchStart, getSuccess } from "../features/stockSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const useStockCalls = () => {
  const dispatch = useDispatch();
  const { axiosWithToken } = useAxios();

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
    deleteFirm,
    deleteBrand,
    postBrand,
    postFirm,
    putBrand,
    putFirm,
  };
};

export default useStockCalls;
