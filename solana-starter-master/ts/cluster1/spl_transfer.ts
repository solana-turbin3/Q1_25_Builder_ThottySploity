import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import wallet from "/home/thotty/Turbin3-wallet.json"
import { getOrCreateAssociatedTokenAccount, transfer, transferFeeLayout } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("ABxF4BTGQguZG82ALJiNf2jp2bG5d5bxpDACYy8bEFku");

// Recipient public address
const to = new PublicKey("2CquYcQoBGv8MiiMfP3Lgut79oLCtDbCTrB6fnQm1WeG"); // Apaar Saini

// Tx/Signature = 5U6DAWCXPrArkSTZtR7TBJbRWtvZ8Hm4haiSJBUdjm7CppfsZcE7LxJBcRJ9C5xFCbkdugUo9cgHazqst5yt3Xu2

(async () => {
    try {
        // Get the token account of the fromWallet address, and if it does not exist, create it
        const fromWallet = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey);

        // Get the token account of the toWallet address, and if it does not exist, create it
        const toWallet = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, to);

        // Transfer the new token to the "toTokenAccount" we just created
        const signature = await transfer(connection, keypair, fromWallet.address, toWallet.address, keypair, 69);

        console.log(`Signature; ${signature}`);

    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();