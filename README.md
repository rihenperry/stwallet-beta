# README #
[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

STRICT NOTE:Commit you code in your Branch only. don't commit anything in Master , it will be removed if commited.
This README documents whatever steps are necessary to get your application up and running.

### Description ###

* Quick summary
  This repository holds code of ST's core backend system.Its the backbone which drives PHP site and other vendor
  specific frontend apps like android, ios and hybrid.

* Version
  v2.0.0 -> current, unstable, lots of changes and improvisation along with new features.
  v1.0.0 -> stable(master)
         -> not currently following the semantic versioning.

### Installation ###

* Configuration
* Dependencies
    -> clone the repo with git CLI or git GUI ```git clone git@bitbucket.org:prashant_tapase/stwallet-beta.git```
    -> ST-wallet currents runs on Node Engine v5.7(stable)
    -> relies on NPM to get the packages ```npm install --save```
    
* Database configuration
    -> ST-wallet makes use of MongoDB as persistent data storage engine.
    -> currently, we are fully aware that this is not good practice: the mongodb config is hardcoded
    -> For the upcoming release v2.0.0, The configs will only be set through environmental vars, a.k.a NODE_ENV
       in node.js development.
    -> good to stick with this mongodb string ```mongodb://username:password@localhost:27027/database```
    -> port change requirement is a must on production servers.
    
* Running the App
    -> [Developement] ```nodemon```
    -> [Production] ```pm2 start```

* How to run tests
    ->will be made available in release v3.0.0

* Deployment instructions
    -> deployed with pm2 which masks the "node app.js" to the background with auto-restarts on crash
    -> The required commands coming soon.

* Writing tests
  -> release v3.0.0
* Code review
  -> bitbucket's internal issue tracker.This is enabled for this repository.
* Other guidelines
  -> It is require to log the code processing for monitoring and diagnostics. The bunyan logging tool is used in this case.
  -> yet to integrate js linting to maintain standard code practices across developers.
  -> you are welcomed to add more guidelines.

### Team ###

* maintainers 
-> Sudeep Makwana
-> Swanand Pingle
-> Prashant Tapase
-> Rihan Pereira

