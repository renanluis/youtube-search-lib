var YoutubeSearch = require('./src/youtube-search-lib');
var youtube = new YoutubeSearch();
var args = process.argv.slice(2);
if (!(args.length > 2)) {
    console.log('Usage: ' + process.argv[1] + ' [search query] [results amount limit] [language (pt-BR)]');
    process.exit(1);
}
youtube.search(args[0], args[1], args[2], function(response) {
    console.log(response);
});