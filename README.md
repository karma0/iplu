# iplu
### Dynamic IP Authentication and Remote Lookup Service

Written in Node.js; meant to operate as simply as possible, bypassing the more common bloat with getting Dynamic DNS setup.

Uses a simple REST API with Hawk authentication to update a local cache of credential / IP address pairings.  There is only a GET, PUT, and a POST, each corresponding to retrieval, update, or create of a credential/IP pairing, respectively.
