const {override, fixBabelImports, addLessLoader} = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        //Importing Antd CSS
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    //Customizing Antd Theme
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {'@primary-color': '#1DA57A'},
    })
);