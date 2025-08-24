import { configureStore } from "@reduxjs/toolkit";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import userReducer from "./userslice/userReducer";
// // import gymReducer from "./gymSlice/gymReducer";
// // import chatReducer from "./chatSlice/chatReducer";
// import { claimModalToggleSlice } from "./claimSlice/claimModalToggleSlice";
// import { activeClaimSlice } from "./claimSlice/activeClaimSlice";
// import { claimFilterSlice } from "./claimSlice/claimFilterSlice";
// import gymClaim from "./claimSlice/gymClaim";
// import adsReducer from "./adSlice/adsSlice";
// // import influencerReducer from "../store/influencerSlice/influencerReducer";
// // import trainerReducer from "./trainerSlice/trainerReducer";
// // import coachReducer from "./coachSlice/coachReducer";
// // import apparelReducer from "./apparelSlice/apparelReducer";
// // import analyticsReducer from "./analyticsSlice/analyitcsReducer";
// import classReducer from "./classSlice/classReducer";
// // import subscriptionReducer from "./subscriptionSlice/subscriptionReducer";
// // import { bookingReducer } from "./bookSlice/bookReducer";
// // import referralReducer from "./referralSlice/referralReducer";
// import referralDashboardReducer from "./referralSlice/referralDashboardSlice";
// import reviewReducer from "./reviewSlice";

const userPersistConfig = {
  key: "user",
  storage,
  whitelist: ["user"], // only user will be persisted
};

const rootReducer = combineReducers({
  user: userReducer,
});

const persistedReducer = persistReducer(userPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

// Create a custom useDispatch hook with proper types
import { useDispatch, useSelector } from "react-redux";

export const useAppDispatch = () => useDispatch();
export const useAppSelector = () => useSelector();
