# HFT-App native
[![Build Status](https://travis-ci.org/hft-app/native.svg?branch=master)](https://travis-ci.org/hft-app/native)

Remastered HFT App, uses Vue and Cordova, doesn't require any own backend. Summary of all relevant information for your daily study routine at the HFT Stuttgart.

[<img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" width="240">](https://play.google.com/store/apps/details?id=de.hft.app)
[<img src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-example-preferred_2x.png" width="187"  style="padding: 15px">](https://apps.apple.com/us/app/id1533457318)


[Latest Release (Android _.apk_ / Firefox Webextension _.xpi_)](https://github.com/hft-app/native/releases/latest)

## Screenshots
<p float="left">
<img src="https://raw.githubusercontent.com/hft-app/native/master/screenshot/lectures.png" width="400" alt="events" style="margin: 20px">
<img src="https://raw.githubusercontent.com/hft-app/native/master/screenshot/events.png" width="400" alt="events" style="margin: 20px">
<img src="https://raw.githubusercontent.com/hft-app/native/master/screenshot/grades.png" width="400" alt="grades" style="margin: 20px">
<img src="https://raw.githubusercontent.com/hft-app/native/master/screenshot/meals_ios.png" width="400" alt="meals" style="margin: 20px" >
<img src="https://raw.githubusercontent.com/hft-app/native/master/screenshot/printers.png" width="400" alt="printers" style="margin: 20px">
<img src="https://raw.githubusercontent.com/hft-app/native/master/screenshot/menu_webext.png" width="500" alt="menu">
</p>

## Contributors
* [Lukas Jans](https://github.com/ljans)
* [Christoph Walcher](https://github.com/wiomoc)

## Implementation TODOs
- [ ] Rework everything related to Date, Timers, Durations...
    1. [ ] Consider using Luxon for more convenient `Date` handling. How to (De)Serialize to `localStorage`?
    2. [ ] Or write some utility functions directly for timestamps
    3. [x] Handle Daylight-Saving-Time correctly.
    4. [ ] Global timer for refreshing `data.now`
    5. [ ] Refresh data in background
- [ ] Support notifications on e.g. new exam result, schedule changes -> requires background refresh
- [ ] Show schedule changes on the "home" page
- [ ] Better error handling
    1. [x] Detect down-for-maintenance
    2. [x] Show errors occurred during refresh to user via sth like a toast/snackbar
    3. [ ] Redirect User to login page on invalid credentials
- [ ] Make scrapers more error resistant & improve code style
- [ ] Some mo tests! most important for components and scrapers
- [x] Event export to calendar/ics
- [x] Summary of licenses used in 3th-party-libs
- [ ] Licenses for cordova build 
- [ ] Move this section to separate issues
- [ ] Improve Readme
- [x] i18n for tips and menu
- [ ] i18n for meal attributes
- [x] Add english translation
- [x] Generate list of professors dynamically
- [ ] Keep scrollposition after back navigation/tab switch
- [x] Go live
- [ ] Webext for
    1. [ ] Chrome
    2. [ ] Safari (macOS)
