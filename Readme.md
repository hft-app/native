# HFT-App native
[![Build Status](https://travis-ci.com/wiomoc/hft-app-native.svg?token=Ykq2LCBTrhtFGahCmAzN&branch=master)](https://travis-ci.com/wiomoc/hft-app-native)

Remastered HFT App, uses Vue and Cordova, doesn't require any own backend.

**Currently** runs as Android App and as Firefox WebExtension

[Latest Release](https://github.com/wiomoc/hft-app-native/releases/latest)

## Implementation TODOs
- [ ] Rework everything related to Date, Timers, Durations...
    1. Consider using Luxon for more convenient `Date` handling. How to (De)Serialize to `localStorage`?
    2. Or write some utility functions directly for timestamps
    3. Handle Daylight-Saving-Time correctly.
    4. Global timer for refreshing `data.now`
    5. Refresh data in background
- [ ] Support notifications on e.g. new exam result, schedule changes -> requires background refresh
- [ ] Show schedule changes in the "home" page
- [ ] Better error handling
    1. Detect down-for-maintenance
    2. Show error to user via sth like a toast/snackbar
    3. Redirect User to login page on invalid credentials
- [ ] Make scrapers more error resistant & improve code style
- [ ] Some mo tests! most important for components and scrapers
- [ ] Event export to calendar/ics
- [ ] Summary of licenses used in 3th-party-libs
- [ ] Move this section to separate issues
- [ ] Improve Readme
- [ ] i18n for tips and menu
- [ ] Add english translation
- [ ] Generate list of professors dynamically
- [ ] Keep scrollposition after back navigation/tab switch
