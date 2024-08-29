import { useDispatch } from "react-redux";
import { loadingOverlaySlice } from "../redux/loadingOverlaySlice";
import { useEffect } from "react";

const useLoadingOverlay = (loading) => {
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(loadingOverlaySlice.actions.setLoadingOverlay(loading));
  },[dispatch,loading]);

};

export default useLoadingOverlay;
