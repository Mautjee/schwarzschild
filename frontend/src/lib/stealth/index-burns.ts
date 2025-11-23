import { computeStealthKey, VALID_SCHEME_ID } from "@scopelift/stealth-address-sdk";
import { getStealthAddy } from "./prepare-keys";
import type { Hex } from "viem";

type BurnLog = {
    ephemeralPublicKey: string;
    burnAddress: string;
}

type KeysFromDecode = {
    viewingPublicKey: string;
    spendingPublicKey: string;
    userPublicKey: string;
    viewingPrivateKey: string;
    spendingPrivateKey: string;
}

// Contract stores bytes32 (x-coordinate only), SDK needs 33-byte compressed key
function reconstructCompressedPublicKey(xCoordinate: string): Hex {
    let xHex = xCoordinate.startsWith('0x') ? xCoordinate.slice(2) : xCoordinate;
    
    if (xHex.length < 64) {
        xHex = xHex.padStart(64, '0');
    } else if (xHex.length > 64) {
        if (xHex.length === 66 && (xHex.startsWith('02') || xHex.startsWith('03'))) {
            return ('0x' + xHex) as Hex;
        }
        xHex = xHex.slice(0, 64);
    }
    
    return ('0x02' + xHex) as Hex; // Try 0x02 prefix first, fallback to 0x03 below
}

export const filterBurns = (burns: BurnLog[], {
    viewingPublicKey,
    spendingPublicKey,
    userPublicKey,
    viewingPrivateKey,
    spendingPrivateKey,
}: KeysFromDecode) => {


    for (const burn of burns) {
        const ephemeralPublicKeyRaw = burn.ephemeralPublicKey;

        try {
            const ephemeralPublicKey = reconstructCompressedPublicKey(ephemeralPublicKeyRaw);
            
            let stealthAddyPrivateKey;
            try {
                stealthAddyPrivateKey = computeStealthKey({
                    viewingPrivateKey: viewingPrivateKey as Hex,
                    spendingPrivateKey: spendingPrivateKey as Hex,
                    ephemeralPublicKey: ephemeralPublicKey,
                    schemeId: VALID_SCHEME_ID.SCHEME_ID_1,
                });
            } catch (e) {
                // Try 0x03 prefix if 0x02 fails
                const ephemeralPublicKeyOdd = ('0x03' + ephemeralPublicKey.slice(4)) as Hex;
                stealthAddyPrivateKey = computeStealthKey({
                    viewingPrivateKey: viewingPrivateKey as Hex,
                    spendingPrivateKey: spendingPrivateKey as Hex,
                    ephemeralPublicKey: ephemeralPublicKeyOdd,
                    schemeId: VALID_SCHEME_ID.SCHEME_ID_1,
                });
            }

            console.log('Computed stealth key for burn:', burn);
            debugger
        } catch (error) {
            console.error('Error computing stealth addy private key:', error);
            continue;
        }
    }

    return null;
}