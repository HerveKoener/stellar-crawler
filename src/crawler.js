var StellarCrawler = {
	callback : function(crawler){console.log(crawler.data.toSource())},
	crawler : {
		links: [],
		data: [],
		load: function(json){
			StellarCrawler.crawler.data = json;
			StellarCrawler.crawler.links = [];
			$.map(json._links, function(value, key) {
				var href = value.href;
				StellarCrawler.crawler.links.push({'key':key,'link' : new StellarCrawler.Link((href.indexOf('{') > 0)?href.substring(0, href.indexOf('{')):href)});
			});
			StellarCrawler.callback(StellarCrawler.crawler);
		},
	},
	Link : function(href){
		this.href = href;
		this.follow = function(){
			$.get(this.href, function(r){StellarCrawler.crawler.load(r)});
		};
	},
	start : function(publicKey, callback, ispublic){
		var server = (ispublic)?'https://horizon.stellar.org/accounts/':'https://horizon-testnet.stellar.org/accounts/';
		this.callback = callback;
		(new StellarCrawler.Link(server+publicKey)).follow();
	},
};