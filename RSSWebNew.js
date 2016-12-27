var cheerio = require("cheerio");
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
	var $=cheerio.load(data);//用cheerio解析页面数据
            var arr=[];
			$("div.info").each(function(index,element){
				 var movieinfo = $('.bd',element).first().children().first();
				 var director =$(movieinfo).text();

				 var reg = /[^\n\t\r]/g;
				director= director.match(reg).join("");
				reg =/\s{3,}/g;
				director = director.replace(reg,"  ");
				 var newlink = $('a',element).attr('href');
				 var star = $('.rating_num',element).first().text();
				 var newtitle = $('span.title',element).first().text();
				 var comment = $('.inq',element).first().text();
                arr.push(
                    {
                        标题: newtitle,
						简介:director,
                        链接: newlink,
					    评分: star,
						评论:comment
                    }
                );
            });
			if(arr.length ==0){
				return;
			}
			var allcontent ="";
			arr.forEach(function(value){
				var strcontent = JSON.stringify(value)+"\n";
				allcontent += strcontent;	
		    });
			//console.log(allcontent);
			fs.appendFile('movie.txt', allcontent, (err) => {
				if (err) throw err;
				//console.log('It\'s saved!');
				num+=25;
				var url = "https://movie.douban.com/top250?start="+num;
				loadPage(url,getpage); 
			});
}

function getmovie250(){
  var url = "https://movie.douban.com/top250?start="+num;
  loadPage(url,getpage); 
}

getmovie250();