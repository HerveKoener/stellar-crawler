var StellarCrawler = {
	callback : function(crawler){console.log(crawler.data.toSource())},
	publicServer : 'https://horizon.stellar.org',
	testServer : 'https://horizon-testnet.stellar.org',
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
	setPublicServer: function(publicServer){
		return this.publicServer = publicServer;
	},
	setTestServer: function(testServer){
		return this.testServer = testServer;
	},
	newInstance : function(path, callback, server){
		this.callback = callback;
		if(server.slice(-1) == '/'){
			server = server.slice(0, -1);
		}
		if(path == ''){
			path = '/ledgers/';
		}
		(new StellarCrawler.Link(server+path)).follow();
	},
	forAccount : function(publicKey, callback, ispublic){
		var server = (ispublic)?this.publicServer:testServer;
		console.log(server);
		this.newInstance('/accounts/'+publicKey, callback, server);
	},
	forLedger : function(sequence, callback, ispublic){
		var server = (ispublic)?this.publicServer:testServer;
		this.newInstance('/ledgers/'+sequence, callback, server);
	},
	forOperation : function(id, callback, ispublic){
		var server = (ispublic)?this.publicServer:testServer;
		this.newInstance('/operations/'+id, callback, server);
	},
	forTransaction : function(hash, callback, ispublic){
		var server = (ispublic)?this.publicServer:testServer;
		this.newInstance('/transactions/'+hash, callback, server);
	},
	forLink : function(stellarLink, callback){
		this.callback = callback;
		stellarLink.follow();
	},
};