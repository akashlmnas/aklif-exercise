aklif
=================

A new CLI generated with oclif


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/aklif.svg)](https://npmjs.org/package/aklif)
[![Downloads/week](https://img.shields.io/npm/dw/aklif.svg)](https://npmjs.org/package/aklif)


<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g aklif
$ aklif COMMAND
running command...
$ aklif (--version)
aklif/0.0.0 win32-x64 node-v20.11.1
$ aklif --help [COMMAND]
USAGE
  $ aklif COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`aklif hello PERSON`](#aklif-hello-person)
* [`aklif hello world`](#aklif-hello-world)
* [`aklif help [COMMAND]`](#aklif-help-command)
* [`aklif plugins`](#aklif-plugins)
* [`aklif plugins add PLUGIN`](#aklif-plugins-add-plugin)
* [`aklif plugins:inspect PLUGIN...`](#aklif-pluginsinspect-plugin)
* [`aklif plugins install PLUGIN`](#aklif-plugins-install-plugin)
* [`aklif plugins link PATH`](#aklif-plugins-link-path)
* [`aklif plugins remove [PLUGIN]`](#aklif-plugins-remove-plugin)
* [`aklif plugins reset`](#aklif-plugins-reset)
* [`aklif plugins uninstall [PLUGIN]`](#aklif-plugins-uninstall-plugin)
* [`aklif plugins unlink [PLUGIN]`](#aklif-plugins-unlink-plugin)
* [`aklif plugins update`](#aklif-plugins-update)

## `aklif hello PERSON`

Say hello

```
USAGE
  $ aklif hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ aklif hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [src/commands/hello/index.ts](https://github.com/akashlmnas/aklif/blob/v0.0.0/src/commands/hello/index.ts)_

## `aklif hello world`

Say hello world

```
USAGE
  $ aklif hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ aklif hello world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [src/commands/hello/world.ts](https://github.com/akashlmnas/aklif/blob/v0.0.0/src/commands/hello/world.ts)_

## `aklif help [COMMAND]`

Display help for aklif.

```
USAGE
  $ aklif help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for aklif.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.32/src/commands/help.ts)_

## `aklif plugins`

List installed plugins.

```
USAGE
  $ aklif plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ aklif plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.46/src/commands/plugins/index.ts)_

## `aklif plugins add PLUGIN`

Installs a plugin into aklif.

```
USAGE
  $ aklif plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into aklif.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the AKLIF_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the AKLIF_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ aklif plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ aklif plugins add myplugin

  Install a plugin from a github url.

    $ aklif plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ aklif plugins add someuser/someplugin
```

## `aklif plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ aklif plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ aklif plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.46/src/commands/plugins/inspect.ts)_

## `aklif plugins install PLUGIN`

Installs a plugin into aklif.

```
USAGE
  $ aklif plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into aklif.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the AKLIF_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the AKLIF_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ aklif plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ aklif plugins install myplugin

  Install a plugin from a github url.

    $ aklif plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ aklif plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.46/src/commands/plugins/install.ts)_

## `aklif plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ aklif plugins link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ aklif plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.46/src/commands/plugins/link.ts)_

## `aklif plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ aklif plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ aklif plugins unlink
  $ aklif plugins remove

EXAMPLES
  $ aklif plugins remove myplugin
```

## `aklif plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ aklif plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.46/src/commands/plugins/reset.ts)_

## `aklif plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ aklif plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ aklif plugins unlink
  $ aklif plugins remove

EXAMPLES
  $ aklif plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.46/src/commands/plugins/uninstall.ts)_

## `aklif plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ aklif plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ aklif plugins unlink
  $ aklif plugins remove

EXAMPLES
  $ aklif plugins unlink myplugin
```

## `aklif plugins update`

Update installed plugins.

```
USAGE
  $ aklif plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.46/src/commands/plugins/update.ts)_
<!-- commandsstop -->
