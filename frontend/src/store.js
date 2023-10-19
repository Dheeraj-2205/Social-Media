// import {configureStore} from "@reduxjs/toolkit"
// import { userReducer } from "./Reducers/User"

// const store = configureStore({
//     reducer : {
//         user : userReducer
//     }
// })
// export default store

import { configureStore } from "@reduxjs/toolkit";
import { allUsersReducer, postOfFollowingReducer, userReducer } from "./Reducers/User";

const store = configureStore({
  reducer: {
    user: userReducer,
    postOfFollowing : postOfFollowingReducer, 
    allUsers : allUsersReducer
  },
});
export default store;
