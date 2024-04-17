import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ----------------------User Register----------------------------
export const userRegister = createAsyncThunk("userRegister",
        async ({user_first_name, user_last_name, user_email, user_moblie, password2}, { rejectWithValue }) => {

            axios({
                baseURL: 'http://127.0.0.1:8000/create-user',
                method: "POST",
                data: {
                  first_name: user_first_name,
                  last_name: user_last_name,
                  email: user_email,
                  mobile: user_moblie,
                  password: password2,
                  
                },
              })
                .then((res) => {
                  if (res.status === 201) {
                    console.log("result.data:",res.data);
                    alert("Registration Successful !!");
                  }
                })
                .catch((error) => {
                  console.log("ERROR", error);
                  alert("Error Orrured In Registration");
                  rejectWithValue(error)
                });

        }
)

// ----------------------User Login----------------------------
export const userLogin = createAsyncThunk("userLogin",
        async ({email, password}, { rejectWithValue }) => {

            axios({
                baseURL: 'http://127.0.0.1:8000/login/',
                method: "POST",
                data: {
                        email: email,
                        password: password
                      },
              })
                .then((res) => {
                  if (res.status === 200) {
                    console.log("result.data:",res.data);
                    localStorage.setItem("user-token", res.data["access_token"]);
                    window.location.href = '/homeAfterLogin';
                  }
                })
                .catch((error) => {
                  console.log("ERROR", error);
                  alert("Error!! Please provide valid credentials");
                  return rejectWithValue(error);
                });

        }
)

// // ----------------------Get Current User----------------------------
export const getCurrentUser = createAsyncThunk("getCurrentUser",
        async ({token}, { rejectWithValue }) => {
            console.log("Token in getCurrentUser Slice--", token);
            axios({
                baseURL: `http://127.0.0.1:8000/get-user-profile/${token}`,
                method: "GET",
              })
                .then((res) => {
                  if (res.status === 200) {
                    console.log("Get Current User Data:",res.data);
                  }
                })
                .catch((error) => {
                  console.log("ERROR", error);
                  alert("Error in Get Current User Data");
                  return rejectWithValue(error);
                });

        }
)


// --------------------------------Create Slice Code-----------------------------------------------------------
export const authSlice = createSlice({
    name: "authSlice",
    initialState:{
        userDetails:[],
        loading:false,
        error: null,
    },

    extraReducers: (builder) => {

        // User Login
        builder.addCase(userLogin.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(userLogin.fulfilled, (state) => {
            state.loading = false;
        });

        builder.addCase(userLogin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // User Registration
        builder.addCase(userRegister.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(userRegister.fulfilled, (state) => {
            state.loading = false;
        });

        builder.addCase(userRegister.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Get Current User
        builder.addCase(getCurrentUser.pending, (state) => {
          state.loading = true;
      });

        builder.addCase(getCurrentUser.fulfilled, (state, action) => {
            state.loading = false;
            console.log("action.payload", action.payload)
            state.userDetails = [action.payload];
        });

        builder.addCase(getCurrentUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

    }
})

export default authSlice.reducer;