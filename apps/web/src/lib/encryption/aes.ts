/**
 * This is generated from LLM
 */
import crypto from "node:crypto";

export type EncryptedData = {
  iv: string;
  authTag: string;
  encrypted: string;
};

export class AES256GCM {
  private readonly secretKey: Buffer;

  constructor(secretKey?: Buffer) {
    // If no key provided, generate a random one
    this.secretKey = secretKey || crypto.randomBytes(32);
  }

  /**
   * Encrypt a JSON object or string
   * @param data - The data to encrypt
   * @returns Base64 encoded encrypted data with IV and auth tag
   */
  encrypt(data: string): string {
    try {
      // Convert to JSON string if it's an object

      // Generate a random initialization vector
      const iv: Buffer = crypto.randomBytes(16);

      // Create cipher with algorithm, key, and IV
      const cipher = crypto.createCipheriv("aes-256-gcm", this.secretKey, iv);

      // Encrypt the data
      let encrypted = cipher.update(data, "utf8", "hex");
      encrypted += cipher.final("hex");

      // Get the authentication tag
      const authTag: Buffer = cipher.getAuthTag();

      // Combine IV, auth tag, and encrypted data
      const result: EncryptedData = {
        iv: iv.toString("hex"),
        authTag: authTag.toString("hex"),
        encrypted: encrypted,
      };

      // Return as base64 encoded string
      return Buffer.from(JSON.stringify(result)).toString("base64");
    } catch (error) {
      throw new Error(
        `Encryption failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  /**
   * Decrypt an encrypted JSON string
   * @param encryptedData - Base64 encoded encrypted data
   * @returns The decrypted JSON object
   */
  decrypt(encryptedData: string): string {
    try {
      // Decode from base64
      const data: EncryptedData = JSON.parse(
        Buffer.from(encryptedData, "base64").toString("utf8"),
      );

      // Extract components
      const iv: Buffer = Buffer.from(data.iv, "hex");
      const authTag: Buffer = Buffer.from(data.authTag, "hex");
      const encrypted: string = data.encrypted;

      // Create decipher with algorithm, key, and IV
      const decipher = crypto.createDecipheriv(
        "aes-256-gcm",
        this.secretKey,
        iv,
      );
      decipher.setAuthTag(authTag);

      // Decrypt the data
      let decrypted = decipher.update(encrypted, "hex", "utf8");
      decrypted += decipher.final("utf8");

      return decrypted;
    } catch (error) {
      throw new Error(
        `Decryption failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  /**
   * Get the secret key as hex string (for storage/sharing)
   * @returns Hex encoded secret key
   */
  getKeyHex(): string {
    return this.secretKey.toString("hex");
  }

  /**
   * Create encryptor from hex key
   * @param hexKey - Hex encoded key
   * @returns New encryptor instance
   */
  static fromHexKey(hexKey: string): AES256GCM {
    return new AES256GCM(Buffer.from(hexKey, "hex"));
  }

  /**
   * Generate a new random key
   * @returns Hex encoded random key
   */
  static generateKey(): string {
    return crypto.randomBytes(32).toString("hex");
  }
}
