$.args = arguments[0] || {};
var standardWinView = $.args.standardWinView;

var newsParse = function(data) {
    var contentlets = data.contentlets;

    var newsData = [];
    _.each(contentlets, function(newitem) {
        var row = Alloy.createWidget('news-item', {
            content: newitem
        }).getView();
        row.addEventListener('singletap', newDetail);
        newsData.push(row);
    });

    $.news.setData(newsData);

    // Opening the window when all the content is ready
    Alloy.Globals.openWindow(standardWinView);
};

var newDetail = function(e) {
    Alloy.Globals.winToOpen({
        id: 'new-detail',
        title: e.row.content.title,
        content: e.row.content
    });
};

var HTTPClient = require('HTTPClient');
HTTPClient.contentAPI('News', 'sysPublishDate', newsParse);