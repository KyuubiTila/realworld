import axios from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useArticle = create(
  persist(
    (set) => ({
      articles: [],
      singleArticle: [],
      username: '',
      getArticles: async () => {
        try {
          const articles = await axios.get(
            'http://localhost:3001/api/articles'
          );

          const { data } = articles;

          console.log(data);
          set({ articles: data.data });
        } catch (error) {
          console.error('Error fetching articles:', error);
        }
      },

      getSingleArticle: async (articleId) => {
        console.log(articleId);
        try {
          const article = await axios.get(
            `http://localhost:3001/api/articles/${articleId}`
          );

          const { data } = article;

          console.log(data);
          set({ singleArticle: data.data });
          set({ username: data.data.Profile.User.username });
        } catch (error) {
          console.error('Error fetching article:', error);
        }
      },
    }),
    { name: 'article' }
  )
);
