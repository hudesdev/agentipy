# JavaScript client for Sold

A Umi-compatible JavaScript library for the project.

## Getting started

1. First, if you're not already using Umi, [follow these instructions to install the Umi framework](https://github.com/metaplex-foundation/umi/blob/main/docs/installation.md).
2. Next, install this library using the package manager of your choice.
   ```sh
   npm install @builderz/sold
   ```
2. Finally, register the library with your Umi instance like so.
   ```ts
   import { soldIssuance } from '@builderz/sold';
   umi.use(soldIssuance());
   ```

## Contributing

Check out the [Contributing Guide](./CONTRIBUTING.md) the learn more about how to contribute to this library.
