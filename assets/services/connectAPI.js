function apiPath(path) {
    
  if (process.env.NODE_ENV ===  'development'){
   return 'http://localhost:8000/api/' + path;
    } else {
      return 'https://sandrine-coupart-webapp.herokuapp.com/api/' + path;
    }
}

export default apiPath;