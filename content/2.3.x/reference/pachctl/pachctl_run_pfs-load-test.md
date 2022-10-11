---
# metadata # 
title:  pachctl run pfs-load-test
description: "Run a PFS load test."
date:  2022-10-11T14:56:32-04:00
---

### Synopsis

Run a PFS load test.

```
pachctl run pfs-load-test <spec-file> [flags]
```

### Examples

```

Specification:

-- CommitSpec --

count: int
modifications: [ ModificationSpec ]
fileSources: [ FileSourceSpec ]
validator: ValidatorSpec

-- ModificationSpec --

count: int
putFile: PutFileSpec

-- PutFileSpec --

count: int 
source: string

-- FileSourceSpec --

name: string 
random: RandomFileSourceSpec

-- RandomFileSourceSpec --

directory: RandomDirectorySpec
sizes: [ SizeSpec ]
incrementPath: bool

-- RandomDirectorySpec --

depth: SizeSpec 
run: int

-- SizeSpec --

min: int
max: int
prob: int [0, 100]

-- ValidatorSpec --

frequency: FrequencySpec

-- FrequencySpec --

count: int
prob: int [0, 100]

Example: 

count: 5
modifications:
  - count: 5
    putFile:
      count: 5
      source: "random"
fileSources:
  - name: "random"
    random:
      directory:
        depth: 3
        run: 3
      size:
        - min: 1000
          max: 10000
          prob: 30 
        - min: 10000
          max: 100000
          prob: 30 
        - min: 1000000
          max: 10000000
          prob: 30 
        - min: 10000000
          max: 100000000
          prob: 10 
validator: {}

```

### Options

```
  -b, --branch string   The branch to use for generating the load.
  -h, --help            help for pfs-load-test
  -s, --seed int        The seed to use for generating the load.
```

### Inherited Options

```
      --no-color   Turn off colors.
  -v, --verbose    Output verbose logs
```

