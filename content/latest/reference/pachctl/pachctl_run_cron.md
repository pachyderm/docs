## pachctl run cron

Run an existing MLDM cron pipeline now

### Synopsis

Run an existing MLDM cron pipeline now

```
pachctl run cron <pipeline> [flags]
```

### Examples

```

		# Run a cron pipeline "clock" now
		$ pachctl run cron clock
```

### Options

```
  -h, --help             help for cron
      --project string   Project containing pipeline. (default "joins")
```

### Options inherited from parent commands

```
      --no-color   Turn off colors.
  -v, --verbose    Output verbose logs
```

