module.exports = {
    "globDirectory": "dist",
    "globPatterns": [
      "**/*.{css,js,ico}"
    ],
    "globIgnores" : [
      "register-sw*.js"   
    ],
    "swDest": "dist\\sw.js",
    "swSrc": "src\\sw-base.js"
  };