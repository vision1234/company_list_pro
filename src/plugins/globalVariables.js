
const GlobalVariablesPlugin = {
    install(app) {
      app.config.globalProperties.$baseURL = "http://121.36.25.161:7010/";
    },
  };
  
  export default GlobalVariablesPlugin;
  
  