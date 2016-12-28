 	var XMLWriter = require('xml-writer');
 	var fs = require('fs');

var xmlresult = function(res){
   
	xw = new XMLWriter;
	xw.startDocument('1.0', 'utf-8');
	xw.startElement('rss');
	xw.writeAttribute('version', '2.0');
	xw.writeAttribute('xmlns:content', 'http://purl.org/rss/1.0/modules/content/');
	xw.writeAttribute('xmlns:wfw', 'http://wellformedweb.org/CommentAPI/');
	xw.writeAttribute('xmlns:dc', 'http://purl.org/dc/elements/1.1/');
	xw.writeAttribute('xmlns:atom', 'http://www.w3.org/2005/Atom');
	xw.writeAttribute('xmlns:sy', 'http://purl.org/rss/1.0/modules/syndication/');
	xw.writeAttribute('xmlns:slash', 'http://purl.org/rss/1.0/modules/slash/');
	xw.startElement('channel');
	for(var i =0;i< res.length;i++){
		var xw2 = new XMLWriter;
		xw2.startElement('item');
		xw2.writeElement('title',res[i].标题);
		xw2.writeElement('introduce',res[i].简介);
	    xw2.writeElement('link',res[i].链接);
        xw2.writeElement('star',res[i].评分);
        xw2.writeElement('comment',res[i].评论);
		xw2.endDocument();
		xw.writeRaw(xw2);
	}
	xw.endDocument();
	xw.endDocument();
	xw.endDocument();
 
	fs.writeFile('movie.xml', xw.toString(),  function(err) {
   if (err) {
       return console.error(err);
   }
   console.log("数据写入成功！");
   });
	return xw.toString();
}

module.exports = xmlresult;
