# my-vue-project

## create file src\plugins\globalVariables.js
```

const GlobalVariablesPlugin = {
    install(app) {
      app.config.globalProperties.$baseURL = "your service address";
    },
  };
  
  export default GlobalVariablesPlugin;

```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
