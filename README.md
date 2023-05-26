# stellar-crawler

This is a simple read-only API for the stellar network.

## Dependencies

This library only need jquery: https://jquery.com/

## Installing

### Install Option 1: crawler.min.js

**IDEAL FOR: Quick hacking or small projects**
StellarCrawler provides a [Javascript Minified file](https://github.com/HerveKoener/stellar-crawler/blob/master/crawler.min.js) that includes the entire library. Simply [download this file](https://github.com/HerveKoener/stellar-crawler/blob/master/crawler.min.js) and *include* it in your html page.

```html
<script type="text/javascript" src="./crawler.min.js"></script>
```

```javascript
// Now you're ready to go!
var publicKey = 'GXXXXXXX123456789XXX';
var callback = StellarCrawler.callback;
var isPublicNetwork = true;
StellarCrawler.forAccount(publicKey, callback, isPublicNetwork);
```

## Basic Usage

### Instanciation

This section explain how to crawl Stellar accounts.
First of all you need to instanciate your **crawler** by using the *forAccount* factory method:

```javascript
var publicKey = 'GXXXXXXX123456789XXX';
var callback = StellarCrawler.callback;
var isPublicNetwork = true;
StellarCrawler.forAccount(publicKey, callback, isPublicNetwork);
```

### Navigation

Then you can navigate through the Stellar network by using the *follow()* method provided by the StellarLink object:

```javascript
StellarCrawler.crawler.getLinks()['next'].follow();
StellarCrawler.crawler.followPrev();
```

There are also helper methods that can be used to navigate easily:

```javascript
//Follow the next link
StellarCrawler.crawler.followNext();

//Follow the prev link
StellarCrawler.crawler.followPrev();

//Go back to the previous page
StellarCrawler.crawler.followBack();
```

### Check data

When you have navigated to your favourite page, you can retrieve the data by using the **getData()** method:

```javascript
console.log(StellarCrawler.crawler.getData());
```

## Advanced Usage

### Instanciation with custom horizon server

The API provide another way to instanciate the StellarCrawler. The public factory method **newInstance** allows to instanciate the crawler with custom horizon server:

```javascript
var path = '/accounts/GXXXXXXX123456789XXX';
var callback = StellarCrawler.callback;
var horizonServer = 'https://horizon-testnet.stellar.org';
StellarCrawler.newInstance(path, callback, horizonServer);
```

### Other instanciation methods

The API provide many other ways to instanciate the StellarCrawler. Here is the list of available methods:

 * **StellarCrawler.forAccounty(publicKey, callback, ispublic)** : instanciate a new StellarCrawler based on a public key.
 * **StellarCrawler.forLedger(sequence, callback, ispublic)** : instanciate a new StellarCrawler based on ledger's sequence id.
 * **StellarCrawler.forOperation(id, callback, ispublic)** : instanciate a new StellarCrawler based on an operation ID.
 * **StellarCrawler.forTransaction(hash, callback, ispublic)** : instanciate a new StellarCrawler based on transaction hash.
 * **StellarCrawler.forLink(stellarLink, callback)** : instanciate a new StellarCrawler based on a stellar link.
 * **StellarCrawler.newInstance(path, callback, server)** : instanciate a new StellarCrawler based on custom path.
 
### Historisation

StellarCrawler API provide a historisation mechanism in order to keep track of your journey in the Stellar network. The simplest way to use the historisation mechanism is to call the **followBack()** method. But you can retrieve the full history by calling **getHistory()**:

```javascript
console.log(StellarCrawler.crawler.getHistory());
```

This method returns an array of StellarLink representing the navigation history.

**StellarCrawler.crawler.getlinks()** contains an array of object with:

 * **The key** : name of the link (example: Transactions)
 * **The link** : the link object used during the navigation

**StellarCrawler.crawler.getData()** contains the json representation of the data sent by the Stellar network.

```javascript
console.log(StellarCrawler.crawler.getData());
```

**StellarCrawler.crawler.getHistory()** contains an array of StellarLink representing the navigation history.

**StellarCrawler.crawler.followNext()** follows the 'next' link if available. If the current page doesn't contain a 'next' link, a StellarCrawlerException is thrown. *This method is the same as using StellarCrawler.crawler.getlinks()['next']->follow();*

**StellarCrawler.crawler.followPrev()** follows the 'prev' link if available. If the current page doesn't contain a 'prev' link, a StellarCrawlerException is thrown. *This method is the same as using StellarCrawler.crawler.getlinks()['prev']->follow();*

**StellarCrawler.crawler.followBack()** follows the 'back' link if available. If the current page doesn't contain a 'back' link, a StellarCrawlerException is thrown. *This method is the same as using StellarCrawler.crawler.getlinks()['back']->follow();*

**See the example for more information.**

### Customise test and public network for factory methods

The API provide a way to customize the url of the test/public network used by the StellarCrawler. The public methods **setPublicServer** and **setTestServer** allow to customize the horizon server used by the factory methods:

```javascript
var path = '/accounts/GXXXXXXX123456789XXX';
var callback = StellarCrawler.callback;
var horizonServer = 'https://horizon-testnet.stellar.org';
StellarCrawler.setPublicServer(horizonServer);
StellarCrawler.forAccounty(path, callback, true);
```

# Pretty printing for the Stellar crawler

If you want to generate readable html from the crawler data you can use the jquery-crawler-printer library.

## Dependencies

This library only need jquery: https://jquery.com/

## Installing

### Install Option 1: jquery-crawler-printer.min.js

**IDEAL FOR: Quick hacking or small projects**
StellarCrawler provides a [Javascript Minified file](https://github.com/HerveKoener/stellar-crawler/blob/master/jquery-crawler-printer.min.js) that includes the entire library. Simply [download this file](https://github.com/HerveKoener/stellar-crawler/blob/master/jquery-crawler-printer.min.js) and *include* it in your html page.

```html
<script type="text/javascript" src="jquery-crawler-printer.min.js"></script>
```

## Usage

```javascript
	$('#results').printCrawler(crawler);
```

## Properties description

printCrawler can take an optional parameter called "*options*".
The options can have the following properties:

 * **isTree** : Print the crawler data in html tree instead of html table.
 * **collapsed** : if isTree is set, the tree will be collapsed.
 * **withQuotes** :  add quotes arround Stellar json property name.
 
```javascript
	$('#results').printCrawler(crawler, {isTree:true});
```

See the examples for more information.

# Donation

XLM donations are welcome! : GC6ZIWMTBZZ54VWX6SJH4JEHRHWSE245O2EIW26CMGAS6PM2R4J6V4PH

# License

GNU General Public License v3.0
