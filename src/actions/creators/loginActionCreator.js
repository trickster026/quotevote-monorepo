import axios from "axios"

import jwt from "jsonwebtoken"
import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT
} from "../types"

export const userLogin = (username, password, history) => {
  return async (dispatch, getState) => {
    const result = await getToken(username, password, dispatch)

    dispatch({ type: USER_LOGIN_REQUEST, payload: { loading: true } })

    if ("error" in result) {
      const serverConnectionRefuseError = {
        data: { message: "Connection refuse" }
      }
      const errorMessage =
        typeof result.error.response !== "undefined"
          ? result.error.response
          : serverConnectionRefuseError
      dispatch({
        type: USER_LOGIN_FAILURE,
        payload: { error: errorMessage, loading: false }
      })
    } else {
      const { token, user } = result.data
      localStorage.setItem("token", token)
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: {
          user,
          loading: false,
          error: { data: { message: "" } }
        }
      })

      history.push("/")
    }
  }
}

const getToken = async (username, password, dispatch) => {
  try {
    const baseUri =
      process.env.NODE_ENV === "production"
        ? "http://107.20.29.153/login"
        : "http://localhost:5000/login"

    const response = await axios.post(
      baseUri,
      {
        username: username,
        password: password
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With",
          "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS"
        }
      }
    )
    return response
  } catch (err) {
    return { error: err }
  }
}

export function tokenValidator() {
  const storedToken = localStorage.getItem("token")

  const result = jwt.verify(storedToken, "HHSB", function(err, decoded) {
    if (err) {
      localStorage.removeItem("token")
      // console.log("Error", err);
      return false
    } else {
      // console.log(decoded);
      return true
    }
  })

  return result
}

export function clearToken() {
  localStorage.removeItem("token")
}

export const userLogout = history => {
  return async (dispatch, getState) => {
    clearToken()

    dispatch({
      type: USER_LOGOUT,
      payload: {}
    })
    history.push("/logout")
  }
}
