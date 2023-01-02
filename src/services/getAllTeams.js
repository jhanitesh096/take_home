import axios from "axios";
const BASE_URL = "https://www.balldontlie.io/api/v1";

// fetch all teams from endpoint
export const getAllTeams = async (params) => {
  const { page, per_page } = params;
  let url = `${BASE_URL}/teams?page=${page}&per_page=${per_page}`;
  return await axios.get(url);
};

// fetch team details by id;
export const getTeamById = async (params) => {
  let url = `${BASE_URL}/teams/${params}`;
  return await axios.get(url);
};

// get all game details from team id and season;
export const getGameDataByTeamId = async (params) => {
  const { season, teamId } = params;
  let url = `${BASE_URL}/games?seasons[]=${season}&team_ids[]=${teamId}`;
  return await axios.get(url);
};
