import {
  PERSONS_LIST_REQUEST,
  PERSONS_LIST_SUCCESS,
  PERSONS_LIST_FAIL,
} from "../constants/Personsconstant";
import axios from "axios";

export const listpersons = () => async (dispatch) => {
  try {
    dispatch({ type: PERSONS_LIST_REQUEST });

    const { data } = await axios.get(`https://panorbit.in/api/users.json`);
    dispatch({ type: PERSONS_LIST_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({ type: PERSONS_LIST_FAIL, payload: error });
  }
};
