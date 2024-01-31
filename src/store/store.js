import { configureStore } from "@reduxjs/toolkit"; 
import companyReducer from "./slices/companySlice";
 

export default configureStore({
  reducer: { 
    company: companyReducer, 
  },
});
