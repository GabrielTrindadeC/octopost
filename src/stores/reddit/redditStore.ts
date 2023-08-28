import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { redditOauth } from './../../services/api/Reddit/oauth/oauth';
import { redditProfile } from './../../services/api/Reddit/profile/profile';

interface IUseReddit {
  setToken: () => void;
  setChecked: (bool: boolean) => void;
  getProfile: (authToken: string) => void;
  redditAcessToken: string | null;
  redditRefreshToken: string | null;
  expiresIn: number | null;
  checked: boolean;
  userName: string;
  isLogged: boolean;
}

export const useReddit = create<IUseReddit>()(
  persist(
    (set) => {
      if (window.location.search) {
        // eslint-disable-next-line no-console
        const loginParams = new URLSearchParams(window.location.search);
        if (loginParams.has('code')) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          redditOauth(loginParams.get('code') as any).then((res) => {
            localStorage.setItem('@redditAuth', JSON.stringify(res));
          });
        }
      }
      return {
        redditAcessToken: null,
        redditRefreshToken: null,
        expiresIn: null,
        checked: false,
        userName: '',
        isLogged: false,
        async setToken() {
          try {
            const URL = `https://www.reddit.com/api/v1/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=${process.env.REACT_APP_RESPONSE_TYPE}&state=${process.env.REACT_APP_RANDOM_STRING}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&duration=${process.env.REACT_APP_DURATION}&scope=${process.env.REACT_APP_SCOPE}`;
            window.open(
              URL,
              'targetWindow',
              'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=500,height=500'
            );

            window.close();
          } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
          }
        },
        setChecked(bool) {
          set({ checked: bool });
        },
        async getProfile(authToken: string) {
          try {
            const { name } = await redditProfile(authToken);
            set({ userName: name });
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
          }
        },
      };
    },
    {
      name: '@redditAuth', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage),
      // (optional) by default, 'localStorage' is used
    }
  )
);
window.addEventListener('storage', (event) => {
  if (event.key === '@redditAuth') {
    const value = JSON.parse(event.newValue as string);
    if (value.redditAcessToken === null) useReddit.setState({ ...value });
  }
});
