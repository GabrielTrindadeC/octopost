import { redditApi } from './../../../axiosInstance/Reddit/reddit';
import { IProfile } from './profile.types';

export const redditProfile = async (acessToken: string): Promise<IProfile> => {
  const { data } = await redditApi.get<IProfile>('me', {
    headers: {
      Authorization: `Bearer ${acessToken}`,
      'content-type': 'application/x-www-form-urlencoded',
    },
  });
  return { name: data.name };
};
