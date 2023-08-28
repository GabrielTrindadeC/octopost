import axios from 'axios';

export const redditApi = axios.create({
  baseURL: 'https://oauth.reddit.com/api/v1',
});
