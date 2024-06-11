import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MmUyMDVkNmY1NDQwOTIwMDQ2NDI2MGVhY2I3ODgwZCIsInN1YiI6IjY2NjU1YzY5YmUzZjNjYWFlZDljZmEzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9z2uc7m1UXLDigX9zSrtrss2AbBcbtyOuiEQbD9frsA',
  },
});

export default api;
