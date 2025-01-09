import { Connection, Keypair, PublicKey } from "@solana/web3.js"
import { Program, Wallet, AnchorProvider } from "@coral-xyz/anchor"
import { IDL, Turbin3Prereq } from "./programs/Turbin3_prereq";
import Turbinwallet from "./Turbin3-wallet.json";














// Import from wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(Turbinwallet));

// Devnet connection
const connection = new Connection("https://api.devnet.solana.com");

// Github account
const github = Buffer.from("thottysploity", "utf8");

//Creating our anchor provider
const provider = new AnchorProvider(connection, new Wallet(keypair), {commitment: "confirmed"});

//Create our program
const program: Program<Turbin3Prereq> = new Program(IDL, provider);

// Create the PDA for our enrollment account
const enrollment_seeds = [Buffer.from("prereq"),
    keypair.publicKey.toBuffer()];
    const [enrollment_key, _bump] =
    PublicKey.findProgramAddressSync(enrollment_seeds, program.programId);

// Execute our enrollment transaction
(async () => {
    try {
        const txhash = await program.methods.complete(github).accounts({signer: keypair.publicKey}).signers([keypair]).rpc();
        console.log(`Success! Check out your TX here:
        https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();