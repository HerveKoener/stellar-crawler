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

See the example for more information.

## Donation

XLM donations are welcome! : GC6ZIWMTBZZ54VWX6SJH4JEHRHWSE245O2EIW26CMGAS6PM2R4J6V4PH

## License

MIT