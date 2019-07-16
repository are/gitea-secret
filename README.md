# gitea-secret

Store your secrets in a private Gitea repo. This simple tool will fetch the secret using your Gitea API key.

## Beware

This is absolutely not the safest way to store secrets. There is bazillion problems with it.
I won't get into this. This is just a tool that will fit into my restricted setup. Use at your own risk.

## Usage

    $ npm install -g gitea-secret
    $ gitea-secret -t TOKEN -h HOST -r REPO -k KEY -o FILE

### `-t TOKEN`
_mandatory_ To obtain this token, go to Gitea > Settings > Applications > Manage Access Tokens.

### `-h HOST`
_mandatory_ Host of your gitea server. Don't type in the protocol - it only allows for HTTPS.
Example: `git.example.com`.

### `-r REPO`
_mandatory_ Name of the repository (including the owner). Example: `foo/bar`.

### `-k KEY`
_mandatory_ Path to the file that contains the secret. Example: `secrets/mySecret`.

### `-o FILE`
_optional_ If this flag is specified, the secret will be written to a file (instead of output to STDOUT).
