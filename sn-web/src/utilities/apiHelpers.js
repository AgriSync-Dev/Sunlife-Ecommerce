// import { store } from "app/store"
import axios from "axios"
import { API_URL } from "../config";
// import accessToken from "./jwt-token-access/accessToken"

//pass new generated access token here
const token = ''

//apply base url for axios
const baseUrl = API_URL;
// console.log(store, 'store')

// const getAccessToken = () => store.getState().user.tokens?.access.token


const axiosApi = axios.create({
	baseURL: API_URL,
})

axiosApi.defaults.headers.common["Authorization"] = token

axiosApi.interceptors.response.use(
	response => response,
	error => Promise.reject(error)
)

export async function apiGET(url, config = {}) {
	// let accessToken = getAccessToken()
	let accessToken = localStorage.getItem("accessToken");
	axiosApi.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
	return await axiosApi
		.get(url, { ...config })
		.then(response => response)
		.catch(error => error.response)
}

export async function apiPOST(url, data, config = {}) {
	// let accessToken = getAccessToken() 
	let accessToken = localStorage.getItem("accessToken");
	axiosApi.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
	return axiosApi
		.post(url, { ...data }, { ...config })
		.then(response => response)
		.catch((error) => error.response)
}

export async function apiPUT(url, data, config = {}) {
	// let accessToken = getAccessToken()
	let accessToken = localStorage.getItem("accessToken");
	axiosApi.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
	return axiosApi
		.put(url, { ...data }, { ...config })
		.then(response => response)
		.catch((error) => error.response)
}

export async function apiDELETE(url, config = {}) {
	//let accessToken = getAccessToken()
	let accessToken = localStorage.getItem("accessToken");
	axiosApi.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
	return await axiosApi
		.delete(url, { ...config })
		.then(response => response)
		.catch((error) => error.response)
}

// export async function uploadPost(data) {
//   let myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");
//   // const accessToken = getAccessToken()
//   let accessToken = localStorage.getItem("accessToken");
//   myHeaders.append("Authorization", "Bearer " + accessToken);
//   const raw = JSON.stringify(data);
//   const requestOptions = {
//     method: 'POST',
//     headers: myHeaders,
//     body: raw,
//   };
//   try {
//     // const result =  await fetch("https://kahunadev.devapps.ga/v1/celebProfile/uploadToAzure", requestOptions)
//     const uploadUrl = baseUrl + "/v1/upload-file"
//     const result = await fetch(uploadUrl, requestOptions)
//     const response = await result.json()
//     return response.data
//   } catch (err) {
//     console.log("err errerr ", err.message)
//   }
// }