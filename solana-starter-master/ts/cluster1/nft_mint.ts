import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createSignerFromKeypair, signerIdentity, generateSigner, percentAmount } from "@metaplex-foundation/umi"
import { createNft, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";

import wallet from "/home/thotty/Turbin3-wallet.json"
import base58 from "bs58";

const RPC_ENDPOINT = "https://api.devnet.solana.com";
const umi = createUmi(RPC_ENDPOINT);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const myKeypairSigner = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(myKeypairSigner));
umi.use(mplTokenMetadata())

const mint = generateSigner(umi);

// https://explorer.solana.com/tx/kjmck7xSXjRjt1cxzsNBuiKNALBAuoYGagfCZm5h9wwbvLajht9LR7qXGHynYUGsVqifsuC6BRk6WAm5YrBTrYG?cluster=devnet
// Mint Address:  HmAY3iecSTrzPR324q5jWRHtAN4JH5gY5AbEWTTfLpuK

// https://explorer.solana.com/tx/keNZ6Rk163caZmbfLfth7gvqQ5MvUxRKXXf5bS7WiLKPSiTBcve7NCnQ2Ho8o94GSBCfEtws4LzLvptEMbnTdBS?cluster=devnet
// Mint Address:  211WSj1ZoLjmQeYBxiFao1d6CQYX7SiBxLbARfa4Bp8h

(async () => {
    let tx = createNft(umi, {
        mint,
        name: "Andre's Energy Addiction",
        symbol: "AEA",
        uri: "https://devnet.irys.xyz/Eu2qtc1jWDtPE1WV8Mv3xVD8MPdifQbnGBKZErrECSmE",
        sellerFeeBasisPoints: percentAmount(100),
    });
    let result = await tx.sendAndConfirm(umi);
    const signature = base58.encode(result.signature);
    
    console.log(`Succesfully Minted! Check out your TX here:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`)

    console.log("Mint Address: ", mint.publicKey);
})();