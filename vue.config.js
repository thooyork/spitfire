module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
  ? ''
  : '/',
    
    configureWebpack: {
        module: {
          rules: [
            {
              test: /\.(fbx)(\?.*)?$/,
              use: [
                {
                  loader: 'file-loader'
                }
              ]
            }
          ]
        }
      }
    
   
}
