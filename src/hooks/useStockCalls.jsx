import React from "react";

const useStockCalls = () => {
  const getFirms = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.get(`${BASE_URL}stock/firms/`, {
        headers: { Authorization: `Token ${token}` },
      });
      console.log(data);
      dispatch(getSuccess({ data, url }));
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
    }
  };

  return <div>useStockCalls</div>;
};

export default useStockCalls;
