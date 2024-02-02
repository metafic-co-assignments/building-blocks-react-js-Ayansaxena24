## Visual QA NodeJS Web Tool Example

Visual QA NodeJS Web Tool

## Getting Started

These instructions will get you a copy of the project up and running.

### Prerequisites

What things you need to install the software and how to install them

* curl (last tested on 7.70.0 (x86_64-apple-darwin19.4.0) libcurl/7.70.0 SecureTransport zlib/1.2.11)

* IFF brew is installed and user doesn't have permisions.
```
  $ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/uninstall)"
  $ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

### Project Structure

        |---Project Name
             |--- designs
                  |--- Chrome
                       |--- Debug
                       |--- Release
                  |--- Firefox
                       |--- Debug
                       |--- Release
             |--- screenshots
                  |--- Chrome
                       |--- Debug
                       |--- Release
                  |--- Firefox
                       |--- Debug
                       |--- Release
                
             |--- json
                  |--- Chrome
                       |--- Debug
                       |--- Release
                  |--- Firefox
                       |--- Debug
                       |--- Release
   

### Input JSON Structure

        |--- projectName
        |--- builderTracker
            |--- url
            |--- id
            |--- token
        |--- visualQA
            |--- url
            |--- sigma
            |--- threshold
        |--- web
            |--- designCompsRepo
            |--- designCompsArchiveURL
            |--- width
            |--- height
            |--- nodePort
            |--- repo
            |--- branch
            |--- debugURL
            |--- init
            |--- update
            |--- start
            |--- screens
                |--- featureName
                |--- path
     
     
### Running

Run
```
  $ yarn
  $ node webVQANodeJS.ts 
```

## Running the tests

```
  $ yarn test
```

### Logs

eventsLog.txt
errorLog.txt

## CI/CD Details

We use CircleCI/Codefresh/GitlabCI for our deployment/Build pipelines

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).



