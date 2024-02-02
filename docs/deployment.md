# Overview

Application code will be branched on the basis on fixes and features, not on environments, i.e. build on artefact, deploy it to many places.


[Workflow diagram](https://miro.com/app/board/o9J_koCvl7E=/)

### High level operation

1. Human readable version numbers are created at container build, e.g. 0.0.3
   - The git tag is associated with the commit that triggered the build, the container created is tagged with the matching number/tag.
   - The helm chart app version is also assocated with the same number/tag.
2. Deploys to stage or production are triggered by annotating the desired tag with 'stage' or 'prod'.
   - e.g. annotating tag 0.2.1 with stage will trigger the stage deployment job.
   - The [deploy.sh](../tools/deploy.sh) script is provided to aid with this operation.