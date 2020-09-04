// const escapeStringRegexp = require('escape-string-regexp');
const fs = require('fs')
const paths = require('../../react-scripts/config/paths')

const getHTMLDataAsync = () => {
  let data = ''
  return new Promise((resolve, reject) => {
    if (data) return resolve(data)
    fs.readFile(paths.appHtml, 'utf-8', (err, htmlData) => {
      if (err) return reject(err)
      resolve(htmlData)
    })
  })
}

class InsertDataIntoHTMLPlugin {
  constructor(placeholder) {
    this.placeholder = placeholder
  }

  apply(compiler) {
    compiler.plugin('compilation', compilation => {
      compilation.plugin(
        'html-webpack-plugin-before-html-processing',
        (data, callback) => {
          getHTMLDataAsync().then(htmlData => {
            data.html = htmlData.replace(
              '<?=' + this.placeholder + '?>',
              process.env.USER_INFO
            )
            callback(null, data)
          })
        }
      );
    });
  }
}

module.exports = InsertDataIntoHTMLPlugin
