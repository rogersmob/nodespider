var cheerio = require("cheerio");
//var log4js = require('log4js');
var fs = require('fs');
var contentarr=[];
function loadPage(url,callback) {

	var https = require('https');
	
		https.get(url, function (res) {
			var html = '';
			res.on('data', function (d) {
				html += d.toString()
			});
			res.on('end', function () {
				callback(html);
			});
		}).on('error', function (e) {
			console.log(e);
		});
	
}

var num =0;
function getpage(data){
	//console.log(data);
	var $=cheerio.load(data);//用cheerio解析页面数据
            var arr=[];
			$("div.hd").each(function(index,element){//类似于jquery的操作，前端的小伙伴们肯定很熟悉啦
				 var newlink = $('a',element).attr('href');
				 var newtitle = $('span.title',element).first().text();
				//console.log($(element).find('href').text());
                arr.push(
                    {
                        标题: newtitle,
                        链接: newlink
                    }
                );
            });
            //console.log(arr);
			if(arr.length ==0){
				return;
			}
			var allcontent ="";
			arr.forEach(function(value){
				var strcontent = JSON.stringify(value)+"\n";
				allcontent += strcontent;	
				//contentarr.push(strcontent);
				// fs.appendFile('movie.txt', strcontent, (err) => {
				// 	if (err) throw err;
				// 	console.log('It\'s saved!');
				// });
		    });
			console.log(allcontent);
			fs.appendFile('movie.txt', allcontent, (err) => {
				if (err) throw err;
				console.log('It\'s saved!');
				num+=25;
				var url = "https://movie.douban.com/top250?start="+num;
				//setTimeout(loadPage, 10,getpage);
				loadPage(url,getpage); 
			});
			//var strcontent = JSON.stringify(arr);
}


function getmovie250(){
  var url = "https://movie.douban.com/top250?start="+num;
  loadPage(url,getpage); 
}

getmovie250();