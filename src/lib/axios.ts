import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://agrocv-api.dbgdang6hvgmbef2.eastus.azurecontainer.io:5000',
})