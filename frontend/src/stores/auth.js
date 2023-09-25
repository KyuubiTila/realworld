import axios from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuth = create(
  persist(
    (set) => ({
      user: [],
      loggedIn: false,

      userDetails: async () => {
        try {
          const accessToken = localStorage.getItem('accessToken');
          if (!accessToken) {
            console.error('Access token not found.');
            return;
          }

          const details = await axios.get(
            'http://localhost:3001/api/user/verify/authToken',
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          console.log(details);

          set({ user: details.data.username });
          set({ loggedIn: true });
        } catch (error) {
          console.error('Error logging in:', error);
        }
      },

      logOut: () => {
        set({ user: [] });
        set({ loggedIn: false });
      },
    }),
    { name: 'auth' }
  )
);
