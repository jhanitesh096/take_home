import axios from "axios";
const BASE_URL = "https://www.balldontlie.io/api/v1";

export const getAllTeams = async (params) => {
  const { page, per_page } = params;
  let url = `${BASE_URL}/teams?page=${page}&per_page=${per_page}`;
  return await axios.get(url);
};

export const getTeamById = async (params) => {
  let url = `${BASE_URL}/teams/${params}`;
  return await axios.get(url);
};

