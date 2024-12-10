import {program} from 'commander';
import {
    Connection,
    PublicKey,
} from '@solana/web3.js';
import { migrate, global, createBondingCurve, setClusterConfig } from './script';

program.version('0.0.1');

programCommand('migrate')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .action(async (directory, cmd) => {
        const { env, keypair, rpc } = cmd.opts();

        // console.log('Solana Cluster:', env);
        // console.log('Keypair Path:', keypair);
        // console.log('RPC URL:', rpc);

        await setClusterConfig(env, keypair, rpc)

        const txId = await migrate();
        console.log("Transaction ID: " ,txId);
    });

programCommand('global')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .action(async (directory, cmd) => {
        const { env, keypair, rpc } = cmd.opts();

        // console.log('Solana Cluster:', env);
        // console.log('Keypair Path:', keypair);
        // console.log('RPC URL:', rpc);

        await setClusterConfig(env, keypair, rpc)

        const txId = await global();
        console.log("Transaction ID: " ,txId);
    });

programCommand('createCurve')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .action(async (directory, cmd) => {
        const { env, keypair, rpc } = cmd.opts();

        // console.log('Solana Cluster:', env);
        // console.log('Keypair Path:', keypair);
        // console.log('RPC URL:', rpc);

        await setClusterConfig(env, keypair, rpc)

        const txId = await createBondingCurve();
        console.log("Transaction ID: " ,txId);
    });

function programCommand(name: string) {
    return program
        .command(name)
        .option('-e, --env <string>', 'Solana cluster env name', 'devnet')
        .option('-r, --rpc <string>', 'Solana cluster RPC name', 'https://api.devnet.solana.com')
        .option('-k, --keypair <string>', 'Solana wallet Keypair Path', '/home/ubuntu/pump-fun-contract/pump-science-contract/pump_key.json')
}

program.parse(process.argv);