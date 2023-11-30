
const GlobalVariablesPlugin = {
    install(app) {
      app.config.globalProperties.$baseURL = "http://127.0.0.1:7010/";
    },
  };
  
  export default GlobalVariablesPlugin;
  