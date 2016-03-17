# iplu
### Dynamic IP Authentication and Remote Lookup Service

Written in Node.js; meant to operate as simply as possible, bypassing the bloat with getting the more common Dynamic DNS setup.

Assuming that you have a host or network sitting on a dynamically assigned address, and a host on the Internet that sits on a static IP address or a consistent domain name address, you can run the service on the consistent address, and hit it from a the dynamic address on the preconfigured port using pre-defined credentials.  Then, when you need to retreive a given host/networks address, you can query the service using the credentials that were supplied, and it will respond with an IP address.

Uses a simple REST API with Hawk authentication to update a local cache of credential / IP address pairings.  There is a `GET`, `PUT`, and a `POST`, each corresponding to retrieval or update/create of a credential/IP pairing, respectively.

### Example

1.  A network connected to the Internet sits at `1.2.3.4` on a _dynamically assigned_ IP address.
2.  A host on the Internet sits at `iplu.mydomain.com`, so I connect to the host and clone this repo.
3.  I have the server at `iplu.mydomain.com` setup as a `Docker` server, so I edit the `creds.json` file and build launch the application using the supplied `Dockerfile`.
4.  The server is now running at the URL [http://iplu.mydomain.com:8000](http://iplu.mydomain.com:8000).
5.  From a host on the network that is connected to the Internet at `1.2.3.4`, I clone the repository and configure the application using the `config.js` file.
6.  Then I setup a cron job to execute the `update.js` script periodically.
 
This will consistently update the local database of IP addresses on every update, allowing for it to be queried.  Any time that I need to access one of the networks, I can dynamically hit the URL, authenticate with the credentials supplied, and retreive the IP.  Or, you can just run the `client.js` script from anywhere:

    $ ./client.js
    1.2.3.4

### Support

Please create an issue on GitHub.

### Contributing

Please submit a pull request.
