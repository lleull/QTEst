import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  user: [],
  isLoading: false,
  error: "",
  loginError: "",
  registeredData: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    userRegisterData: (state, action) => {
      state.registeredData = action.payload;
      state.isLoading = false;
    },
    userLoaded: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    userLogout: (state) => {
      state.isLoading = false;
      state.error = null;
    },
    userError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    userLogin: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    userLoginError: (state, action) => {
      state.isLoading = false;
      state.loginError = action.payload;
    },
  },
});

export const {
  userLoading,
  userLoaded,
  userLogout,
  userRegisterData,
  userError,
  userLogin,
  userLoginError,
} = userSlice.actions;
export const updateProfile = (payload) => async (dispatch) => {
  try {
    dispatch(profileUpdateStart());

    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      throw new Error("Authentication token not found");
    }

    const response = await fetch(`${API_BASE_URL}/auth/edit-profile`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to update profile");
    }

    const profileResponse = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });

    const profileData = await profileResponse.json();
    const userProfile = profileData.foundUsers[0];
    dispatch(userLoaded(userProfile));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update profile";
    throw error;
  }
};
export const RegisterUser = (data) => async (dispatch) => {
  try {
    dispatch(userLoaded());
    dispatch(userRegisterData(data));
    dispatch(userError("Error"));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete gym";
    dispatch(userError(message));
    throw error;
  }
};
export const HandleLogin = (data) => async (dispatch) => {
  try {
    dispatch(userLoaded());
    dispatch(userRegisterData(data));
    const userData = [];
    const userFound = userData.filter(
      (user) => user.email === data.email && user.password === data.password,
    );
    if (userFound) {
      dispatch(userLogin(data));
    } else {
      dispatch(userLoginError("No user found"));
    }
    dispatch(userError("Error"));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete gym";
    dispatch(userError(message));
    throw error;
  }
};

export default userSlice.reducer;
