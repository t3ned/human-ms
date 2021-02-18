# human-ms

A time converter for translating ms to human text, and vice versa.

human-ms supports the use of a/an, commas, and "and" with optional configuration for allowing other human text outside of the units.

### Installation

```shell
# Install with npm
npm i human-ms

# Install with yarn
yarn add human-ms
```

_Typings come with human-ms by default_

### Parsing human text to milliseconds

Here is an example of the general usage of the `parseHuman` function:

```ts
import { parseHuman } from "human-ms";

parseHuman("1 hour"); // 3600000
parseHuman("an hour and 30 mins"); // 5400000
parseHuman("1 hour and 30 minutes"); // 5400000
parseHuman("1h30m"); // 5400000
parseHuman("1h, 30 minutes"); // 5400000

// Read the lines below for an explanation for why this is 0
parseHuman("We are leaving in 10 minutes"); // 0
```

The `ignoreOtherText` option is `true` by default. When this option is `true` and additional human text is passed outside of the units, the function with return 0.

```ts
parseHuman("We are leaving in 30 minutes", { ignoreOtherText: false }); // 1800000
parseHuman("We are leaving in an hour", { ignoreOtherText: false }); // 3600000
```

### Parsing milliseconds to human text

Here is an example of the general usage of the `parseMS` function:

```ts
import { parseMS } from "human-ms";

parseMS(3600000); // 1 hour
parseMS(5400000); // 1 hour and 30 minutes
```

The `replaceLastCommaWithAnd` option is `true` by default. When this option is `true`, the last comma (if any) will be replaced with "and".

```ts
parseMS(5400000, { replaceLastCommaWithAnd: false }); // 1 hour, 30 minutes
```

The `short` option is `false` by default. When this option is `true`, the function will return the shorthand version of the time string.

```ts
parseMS(5400000, { short: true }); // 1h30m
```

The `joinWith` option is `""` when `short` is `true`, and `", "` when `short` is `false`. This defines the spacing between each unit after the conversion.

```ts
parseMS(5400000, { joinWith: " " }); // 1 hour 30 minutes
parseMS(5400000, { joinWith: ":", short: true }); // 1h:30m
```
