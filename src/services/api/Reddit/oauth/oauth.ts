import axios from 'axios';

import { IOauth } from './oauth.types';

export const redditOauth = async (oauthAcessToken: string): Promise<IOauth> => {
  const form = new FormData();
  form.append('code', oauthAcessToken);
  form.append('grant_type', 'authorization_code');
  form.append('redirect_uri', 'http://localhost:3000');

  const { data } = await axios.post<IOauth>(
    'https://www.reddit.com/api/v1/access_token',
    form,
    {
      headers: {
        Authorization: `Basic ${btoa(`${process.env.REACT_APP_CLIENT_ID}:`)}`,
        'content-type': 'application/x-www-form-urlencoded',
      },
    }
  );
  return data;
};
