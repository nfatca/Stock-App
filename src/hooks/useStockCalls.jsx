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
    console.log("starting");
    try {
      const { data } = await axiosWithToken.get(`stock/${url}/`);
      dispatch(getSuccess({ data, url }));
      console.log(data);
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const getFirms = () => getStockData("firms");
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

  //!--------------------------- PUT CALLS--------------------------------------------

  // const putStockData = async (url,id) => {
  // try {

  // }
  // }
  return { getFirms, getSales, deleteFirm };
};

export default useStockCalls;
