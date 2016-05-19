# Change Log
## [Unreleased]
## [2.0.0] - 2016-04-21
### Changed
- removed hardcoded connection strings from multiple modules and replaced it with .env
which is environmental settings file which stores only machine-specific settings
- adding .env file prevents secret API keys and credentials from getting exposed

## [2.0.0] - 2016-04-16
### Added
- coded generic public-key, signature and other redundant check middlewares and shrinked nearly 3000 lines of code, so that these mw can be added at router level, thus, making them a pluggable code

## [2.0.0] - 2016-04-20
### Removed
- removed redundant public key/signature checking code from multiple controller functions 
of APIs

## [2.0.0] - 2016-03-02
### Added
- added code to set user preferences notification options of type sms, email, push(mobile)
- its a CRUD API to support modification of above user preferences
- initialize default preferences on login/signup for new and existing user

## [2.0.0] - 2016-03-25
### Changed
- moved routes from app.js to its respective router module

## [2.0.0] - 2016-02-27
### Changed
- replaced raw mongodb queries with ODM tool mongoose
