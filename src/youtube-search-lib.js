var https = require('https');

module.exports = 
class YouTubeSearch {
    search(query = '', limit = 3, lang = 'pt-BR', callback) {
        if (query == '') {
            return false;
        }
        var hl = 'pt';
        var gl = 'BR';
        var language = lang.split('-');
        if(typeof language[0] != 'undefined') {
            hl = language[0];
        }
        if(typeof language[1] != 'undefined') {
            gl = language[1];
        }
        var getResults = https.request({
            host: 'www.youtube.com',
            path: '/youtubei/v1/search?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8',
            port: '443',
            method: 'POST',
            headers: {
                'accept': '*/*',
                'accept-language': lang,
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                'origin': 'https://www.youtube.com',
                'pragma': 'no-cache',
                'referer': encodeURI('https://www.youtube.com/results?search_query=' + query),
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.104 Safari/537.36'
            }
        }, function(response) {
            var str = '';
            response.on('data', function(chunk) {
                str += chunk;
            });
            response.on('end', function() {
                let videos = [];
                let json = JSON.parse(str);
                for (let i = 0; i < parseInt(limit); i++) {
                    let videoObj = json.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents[i].videoRenderer;
                    if (typeof videoObj == 'undefined') {
                        break;
                    }
                    let videoTitle = videoObj.title.runs[0].text;
                    let videoUrl = 'https://youtube.com/watch?v=' + videoObj.videoId;
                    videos.push({
                        'title': videoTitle,
                        'url': videoUrl
                    });
                }
                if (!(videos.length > 0)) {
                    return callback({
                        'status': false,
                        'error': 'not_found'
                    });
                }
                return callback({
                    'status': 'ok',
                    'videos': videos
                });
            });
        });
        getResults.write('{"context":{"client":{"hl":"'+hl+'","gl":"'+gl+'","deviceMake":"","deviceModel":"","userAgent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.104 Safari/537.36,gzip(gfe)","clientName":"WEB","clientVersion":"2.20210131.08.00","osName":"Windows","osVersion":"10.0","originalUrl":"https://www.youtube.com/","platform":"DESKTOP","clientFormFactor":"UNKNOWN_FORM_FACTOR","timeZone":"America/Sao_Paulo","browserName":"Chrome","browserVersion":"88.0.4324.104","screenWidthPoints":1920,"screenHeightPoints":552,"screenPixelDensity":1,"screenDensityFloat":1,"utcOffsetMinutes":-180,"userInterfaceTheme":"USER_INTERFACE_THEME_LIGHT","mainAppWebInfo":{"graftUrl":"/results?search_query=' + encodeURI(query) + '"}},"user":{"lockedSafetyMode":false},"request":{"useSsl":true,"internalExperimentFlags":[],"consistencyTokenJars":[],"consentBumpParams":{"consentHostnameOverride":"https://www.youtube.com","urlOverride":""}}},"query":"' + query + '","consentBumpParams":{"consentHostnameOverride":"https://www.youtube.com","urlOverride":""},"webSearchboxStatsUrl":"/search?oq=' + query + '"}');
        getResults.end();
    }
};