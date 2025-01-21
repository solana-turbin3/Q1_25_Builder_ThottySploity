import wallet from "/home/thotty/Turbin3-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        // Follow this JSON structure
        // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

        // Your metadata URI:  https://devnet.irys.xyz/7zaxpwfZxLniqZz8xPfPDKvQABgzCqnScJa2JknssN7
        // Another metadata URI: https://devnet.irys.xyz/Eu2qtc1jWDtPE1WV8Mv3xVD8MPdifQbnGBKZErrECSmE

        const image = "https://devnet.irys.xyz/2bRw1fZQ6uKHg4ojgS7wRxPxuVDbT74PQL9veCUTtx9e"
        const metadata = {
            name: "AndreMonsterEnergy",
            symbol: "AME",
            description: "Andre likes monster energy drink, drinks three of those badboys a day.`",
            image,
            attributes: [
                {trait_type: 'Monsters a day', value: 'Three'},
                {trait_type: 'Monsters synonym', value: 'Badboys'},
            ],
            properties: {
                files: [
                    {
                        type: "image/png",
                        uri: image,
                    },
                ]
            },
            creators: []
        };
        const myUri = await umi.uploader.uploadJson(metadata);
        console.log("Your metadata URI: ", myUri);
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
