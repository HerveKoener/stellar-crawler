# stellar-crawler

This is a simple read-only API for the stellar network.

## Dependencies

This library only need jquery: https://jquery.com/

## Usage

```html
<script type="text/javascript" src="crawler.min.js"></script>
```

```javascript
var publicKey = 'GXXXXXXX123456789XXX';
var callback = StellarCrawler.callback;
var isPublicNetwork = true;
StellarCrawler.start(publicKey, callback, isPublicNetwork);
```

Then crawler.links can be used to navigate through the Stellar network:

```javascript
StellarCrawler.crawler.links[0].link.follow();
```

## Properties description

StellarCrawler.crawler.links contains an array of objects with:

 * The key : name of the link (example: Transactions)
 * The link : the link object used during the navigation

StellarCrawler.crawler.data contains the json representation of the data sent by the Stellar network.

See the examples for more information.

# Pretty printing for the Stellar crawler

If you want to generate readable html from the crawler data you can use the jquery-crawler-printer library.

This is a simple read-only API for the stellar network.

## Dependencies

This library only need jquery: https://jquery.com/

## Usage

```html
<script type="text/javascript" src="jquery-crawler-printer.min.js"></script>
```

```javascript
	$('#results').printCrawler(crawler);
```

## Properties description

printCrawler can take an optional parameter called "options".
The options can have the following properties:

 * isTree : Print the crawler data in html tree instead of html table.
 * collapsed : if isTree is set, the tree will be collapsed.
 * withQuotes :  add quotes arround Stellar json property name.
 
```javascript
	$('#results').printCrawler(crawler, {isTree:true});
```

See the examples for more information.

# Donation

XLM donations are welcome! : GC6ZIWMTBZZ54VWX6SJH4JEHRHWSE245O2EIW26CMGAS6PM2R4J6V4PH

# License

MIT