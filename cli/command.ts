import {program} from 'commander';
import {
    Connection,
    PublicKey,
} from '@solana/web3.js';
import { migrate, global, createBondingCurve, setClusterConfig, addWl } from './script';

program.version('0.0.1');

programCommand('migrate')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .action(async (directory, cmd) => {
        const { env, keypair, rpc } = cmd.opts();

        await setClusterConfig(env, keypair, rpc)
        const migrateTxId = await migrate();
        console.log("Transaction ID: " ,migrateTxId);
    });

programCommand('global')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .action(async (directory, cmd) => {
        const { env, keypair, rpc } = cmd.opts();

        await setClusterConfig(env, keypair, rpc)

        const txId = await global();
        console.log("Transaction ID: " ,txId);
    });

programCommand('createCurve')
    .action(async (directory, cmd) => {
        const { env, keypair, rpc } = cmd.opts();
        
        await setClusterConfig(env, keypair, rpc)
        await createBondingCurve();
    });

programCommand('addWl')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .action(async (directory, cmd) => {
        const { env, keypair, rpc } = cmd.opts();

        await setClusterConfig(env, keypair, rpc)

        await addWl();

        const txId = await createBondingCurve();
        console.log("Transaction ID: " ,txId);
    });
function programCommand(name: string) {
    return program
        .command(name)
        .option('-e, --env <string>', 'Solana cluster env name', 'devnet')
        .option('-r, --rpc <string>', 'Solana cluster RPC name', 'rpc')
        .option('-k, --keypair <string>', 'Solana wallet Keypair Path', '/home/king/contract_test/pump_science/pump-science-contract//pump_key.json')
}

program.parse(process.argv);