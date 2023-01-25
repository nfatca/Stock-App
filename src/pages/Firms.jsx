import { Grid, Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import FirmCard from "../components/FirmCard";
import useStockCalls from "../hooks/useStockCalls";

// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchFail, fetchStart, getSuccess } from "../features/stockSlice";

const Firms = () => {
  const { getFirms } = useStockCalls();
  const { firms } = useSelector((state) => state.stock);
  // const dispatch = useDispatch();
  // const { token } = useSelector((state) => state.auth);
  // const BASE_URL = "https://14148.fullstack.clarusway.com/";

  // const getFirms = async () => {
  //   const url = "firms";
  //   dispatch(fetchStart());
  //   try {
  //     const { data } = await axios.get(`${BASE_URL}stock/firms/`, {
  //       headers: { Authorization: `Token ${token}` },
  //     });
  //     console.log(data);
  //     dispatch(getSuccess({ data, url }));
  //   } catch (error) {
  //     console.log(error);
  //     dispatch(fetchFail());
  //   }
  // };

  useEffect(() => {
    getFirms();
  }, []);

  return (
    <Box>
      <Typography variant="h4" color="error" mb={4}>
        Firms
      </Typography>
      <Button variant="contained">NEW FIRM</Button>
      {firms?.length > 0 && (
        <Grid container justifyContent="center" gap={3}>
          {firms?.map((firm) => (
            <Grid item key={firm.id}>
              <FirmCard firm={firm} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Firms;
