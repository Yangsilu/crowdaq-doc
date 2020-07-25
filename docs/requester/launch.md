Launching Jobs
--------------

## Launch on MTurk

Assume you have a `config.json` file for login to Crowdaq programmtically:
```
{
    "site_url": "https://beta.crowdaq.com",
    "user": "your username on Crowdaq",
    "password": "your password on Crowdaq",
    "token": ""  # you can leave it blank here; it will be automatically generated when you login programmatically later.
}
```

Below is an `mturk-config.json` that you have seen in [get started](./get-started.md).
```
{
	"mturk_config": {
		"sandbox": false,
		"reward_per_hit": 0.01,
		"num_of_hits": 300,
		"lifetime_min": "60*24*30",
		"session_duration_min": "60",
		"auto_approval_min": "60*24*1",
		"require_master": false,
		"require_US": false,
		"other_qualifications":[]
	},
	"meta":{
		"title": "",
		"description": "",
		"keywords": ""
	}
}
```

Below is a detailed explanation on the script to launch it to MTurk. Assume you have `pip install -e .` in the client package.
```
CROWDAQ_FILE=config.json # path to your config.json
PROFILE=default # which mturk profile to use; again, this can be found in ./aws/credentials
TASK_NAME=example_taskset # the name of the Task Set on Crowdaq
MTURK_CONFIG=mturk-config.json
HITS=3 # for each of your task, how many different people do you want to work on it?

set -e
echo "Using config $CROWDAQ_FILE"

if [ -f /tmp/CROWDAQ_TASK_LIST_$TASK_NAME.txt ]; then
	echo "/tmp/CROWDAQ_TASK_LIST_$TASK_NAME.txt exists, click ENTER to delete it, or CTRL+C to cancel"
	read
	rm /tmp/CROWDAQ_TASK_LIST_$TASK_NAME.txt
fi

python cli.py -c $CROWDAQ_FILE login
echo Login
python cli.py -c $CROWDAQ_FILE gen-unfinished-urls $TASK_NAME $HITS > /tmp/CROWDAQ_TASK_LIST_$TASK_NAME.txt

python mturk_cli.py -p $PROFILE launch-task $MTURK_CONFIG --url_file /tmp/CROWDAQ_TASK_LIST_$TASK_NAME.txt --logdir /Users/qiangn/Research/COVID19-Event/logs
```


## Launch for In-house Annotators