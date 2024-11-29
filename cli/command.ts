import {program} from 'commander';
import {
    Connection,
    PublicKey,
} from '@solana/web3.js';
import { setClusterConfig } from './script';
import { migrate } from './script';

program.version('0.0.1');

programCommand('migrate')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .action(async (directory, cmd) => {
        const { env, keypair, rpc } = cmd.opts();

        // console.log('Solana Cluster:', env);
        // console.log('Keypair Path:', keypair);
        // console.log('RPC URL:', rpc);

        await setClusterConfig(env, keypair, rpc)

        const txId = await migrate(new PublicKey("4HFA7dU4Gh9szc3ZF9HTtD6V43TdhsaFtasxzSUWRrAS"));
        console.log("Transaction ID: " ,txId);
        
    });

function programCommand(name: string) {
    return program
        .command(name)
        .option('-e, --env <string>', 'Solana cluster env name', 'devnet')
        .option('-r, --rpc <string>', 'Solana cluster RPC name', 'https://devnet.helius-rpc.com/?api-key=926da061-472b-438a-bbb1-f289333c4126')
        .option('-k, --keypair <string>', 'Solana wallet Keypair Path', '/home/ubuntu/pump-fun-contract/pump-science-contract/test_key.json')
}

program.parse(process.argv);