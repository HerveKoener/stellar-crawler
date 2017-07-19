var StellarCrawler = {
	callback : function(crawler){console.log(crawler.data.toSource())},
	crawler : {
		history: [],
		links: null,
		data: null,
		load: function(json){
			StellarCrawler.crawler.data = json;
			var h = StellarCrawler.crawler.history;
			
			StellarCrawler.crawler.links = (h.length > 1)
				? {back : h[h.length-2]}
				: {};
			$.map(json._links, function(value, key) {
				var href = value.href;
				StellarCrawler.crawler.links[key] = new StellarCrawler.Link((href.indexOf('{') > 0)?href.substring(0, href.indexOf('{')):href);
			});
			StellarCrawler.callback(StellarCrawler.crawler);
		},
		_follow: function(key){
			if(key in this.links){
				this.links[key].follow();
			}else{
				throw new StellarCrawler.Exception("Link "+key+" not found.");
			}
		},
		getLinks: function(){
			return this.links;
		},
		getData: function(){
			return this.data;
		},
		getHistory: function(){
			return this.history;
		},
		followNext: function(){
			this._follow('next');
		},
		followPrev: function(){
			this._follow('prev');
		},
		followBack: function(){
			this._follow('back');
		},
	},
	Link : function(href){
		this.href = href;
		this.follow = function(){
			var h = StellarCrawler.crawler.history;
			if(h.length > 1 && h[h.length-2].href === this.href){
				StellarCrawler.crawler.history.pop();
			}else if(h.length == 0 || h[h.length-1].href !== this.href){
				StellarCrawler.crawler.history.push(this);
			}

			$.get(this.href, function(r){StellarCrawler.crawler.load(r)});
		};
		this.getHref = function(){
			return this.href;
		};
	},
	newInstanceWithServer : function(publicKey, callback, server){
		this.callback = callback;
		if(server.slice(-1) == '/'){
			server = server.slice(0, -1);
		}
		(new StellarCrawler.Link(server+'/accounts/'+publicKey)).follow();
	},
	newInstance : function(publicKey, callback, ispublic){
		var server = (ispublic)?'https://horizon.stellar.org':'https://horizon-testnet.stellar.org';
		this.newInstanceWithServer(publicKey, callback, server);
	},
};