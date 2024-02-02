#!/usr/bin/env bash

# Parameters:
# $1 - PROJECT_ID from Gitlab's CI variables ($CI_PROJECT_ID)
# $2 - Commit's SHA that has triggered the pipeline ($CI_COMMIT_SHA)
# $3 - name of the branch that was pushed
# $4 - GITLAB_TOKEN used for API calls, this must be present
#      on your project's Gitlab Environment variables

echo " - Current branch: $3"

if [[ "$3" == "code-engine" ]]
  then
    echo "Code-engine has been updated, skipping validation"
    exit 0
elif [[ "$3" == "approved" ]]
  then
    echo "Approved has been updated, skipping validation"
    exit 0
  else
    echo "Validating protected code for project $1 SHA $2 ..."
fi

# Trigger validator pipeline
pipeline_response=$(curl -X POST \
     -F token=337a6d145bdbf972e2552ab5a3aba2 \
     -F ref=master \
     -F "variables[PROJECT_ID]=$1" \
     -F "variables[SHA]=$2" \
     https://gitlab.builder.ai/api/v4/projects/11420/trigger/pipeline)

echo "Got pipeline: $pipeline_response"

pipeline_id=$(echo $pipeline_response | jq '.id')

echo "Got pipeline id: $pipeline_id"

# Wait till pipeline is finished
echo "Waiting for pipeline to finish ..."
while status=$(curl --header "PRIVATE-TOKEN: $4" "https://gitlab.builder.ai/api/v4/projects/11420/pipelines/$pipeline_id" | jq '.status'  | tr -d '"')
do
  echo "Pipeline status: ${status}"
  if [ $status == 'success' ]
    then
      echo "Pipeline succeeded"
      break
  fi

  if [ $status == 'failed' ]
    then
      echo "Pipeline failed"
      exit 1
  fi
  sleep 9
done

# Download artifacts from finished pipeline
# Get list of succeeded jobs for the pipeline
jobs=$(curl --header "PRIVATE-TOKEN: $4" "https://gitlab.builder.ai/api/v4/projects/11420/pipelines/$pipeline_id/jobs?scope[]=success" --globoff)

echo "Got succeeded jobs: $jobs"

# Find the job with `"name":"diff"` and get it's id
job_id=$(echo $jobs | jq '.[] | select(.name="diff") | .id')

# Download artifacts archive for this job
curl -L --output artifacts.zip --header "PRIVATE-TOKEN: $4" "https://gitlab.builder.ai/api/v4/projects/11420/jobs/$job_id/artifacts"

# Unzip artifacts, the file we need is inside with name `result`
unzip artifacts.zip

echo "Got pipeline report"
diff=$(cat report)
echo "------------------------------------------------"

if test -z "$diff"
  then
    echo "Code change is valid"
    exit 0
  else
    echo "Code change invalid:"
    cat report
    exit 1
fi
