// import {configureStore} from "@reduxjs/toolkit"
// import { userReducer } from "./Reducers/User"

// const store = configureStore({
//     reducer : {
//         user : userReducer
//     }
// })
// export default store

import { configureStore } from "@reduxjs/toolkit";
import { postOfFollowingReducer, userReducer } from "./Reducers/User";

const store = configureStore({
  reducer: {
    user: userReducer,
    postOfFollowing : postOfFollowingReducer
  },
});
export default store;
