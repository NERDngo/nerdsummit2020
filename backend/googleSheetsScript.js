function onEdit(e) {

    var options = {
        'method': 'get'
    };

    var res = UrlFetchApp.fetch('<url of the server>/initiate-fetch', options);
    Logger.log(res.getContentText());


}