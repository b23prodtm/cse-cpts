export interface StorageUploadInput {
  fileName: string;
  contentType: string;
  buffer: ArrayBuffer;
  folder?: string;
}

export interface StorageUploadResult {
  storageUrl: string;
}

export interface PrivateStorageClient {
  uploadPrivateFile(input: StorageUploadInput): Promise<StorageUploadResult>;
}

export async function storeReceipt(
  client: PrivateStorageClient,
  input: StorageUploadInput,
): Promise<StorageUploadResult> {
  return client.uploadPrivateFile({
    ...input,
    folder: input.folder ?? "justificatifs",
  });
}
