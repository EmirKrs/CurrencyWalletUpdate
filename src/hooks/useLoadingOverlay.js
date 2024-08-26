import { useDispatch } from "react-redux";
import { setLoadingOverlay } from "../redux/loadingOverlaySlice";
import { useEffect } from "react";

const useLoadingOverlay = (loading) => {
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(setLoadingOverlay(loading));
  },[dispatch,loading]);

};

export default useLoadingOverlay;
