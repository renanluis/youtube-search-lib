# YouTube Search
This library could be used to search a specific query string on YouTube.


## Usage
```bash
index.js [search query] [results amount limit] [language. e.g: pt-BR]
```

```javascript
var YoutubeSearch = require('./src/youtube-search-lib');
var youtube = new YoutubeSearch();
var args = process.argv.slice(2);
if (!(args.length > 2)) {
    console.log('Usage: ' + process.argv[1] + ' [search query] [results amount limit] [language (pt-BR)]');
    process.exit(1);
}
youtube.search(args[0], args[1], args[2], function(response) {
    console.log(response);
    /*
        {
        status: 'ok',
        videos: [
            {
            title: 'twenty one pilots: Stressed Out [OFFICIAL VIDEO]',
            url: 'https://youtube.com/watch?v=pXRviuL6vMY'
            }
        ]
        }
    */
});
```

## Requires
- Node.JS

## Suggestions/bug report?
- Create a issue on this repository or contact me on any social network linked on my GitHub profile.