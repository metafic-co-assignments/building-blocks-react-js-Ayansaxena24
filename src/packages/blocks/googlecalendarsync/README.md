## Building Blocks React Native Mobile -  GoogleAssistantIntegration

Building Blocks - React Native Master App - GoogleAssistantIntegration

## Getting Started

### Prerequisites

### Setting up Firebase

**For iOS:**

Step-1: If you already have a Firebase project, skip to step 2. Otherwise, create a new Firebase project by going to Firebase Console. Give your project a name and that's it!

Step-2: Now that the project is created, create a new iOS app in the project dashboard.

Step-3: Now enter your Apple bundle ID and register app.

Step-4: Download the `GoogleService-Info.plist` file and put it in the `src/packages/mobile/ios` of your project.


**For Android:**

Step-1: If you already have a Firebase project, skip to step 2. Otherwise, create a new Firebase project by going to Firebase Console. Give your project a name and that's it!

Step-2: Now that the project is created, create a new Android app in the project dashboard.

Step-3: Just mention the correct package name of your app in the Android package name field and SHA1 in the Debug signing certificate SHA-1 field.

Step-4: Download the `google-services.json` file and put it in the `src/packages/mobile/android/app` of your project.


**For Web:**

Step-1: Create google client id from google console

Step-2: Add following lines of code in `src/packages/web/public/index.html` file

````
<meta name="google-signin-scope" content="https://www.googleapis.com/auth/calendar">
<meta name="google-signin-client_id" content="{{google_client_id}}.apps.googleusercontent.com">
<script async defer src="https://apis.google.com/js/api.js"></script>
````


### Git Structure

### Installing

## Running the tests

## CI/CD Details

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).