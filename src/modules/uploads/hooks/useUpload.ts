"use client";

import { useState, useCallback } from "react";
import { uploadService } from "../services/upload.service";

export function useUpload() {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const uploadFiles = useCallback(async (files: File[]): Promise<string[]> => {
        if (files.length === 0) return [];

        setUploading(true);
        setError(null);

        try {
            // Step 1: Request presigned URLs
            const request = {
                files: files.map((f) => ({
                    file_name: f.name,
                    file_type: f.type,
                })),
            };

            const presignedUrls = await uploadService.getPresignedUrls(request);

            // Step 2: Upload Files to S3 in parallel
            const uploadPromises = files.map((file, index) => {
                const { upload_url } = presignedUrls[index];
                return uploadService.uploadFileToS3(upload_url, file);
            });

            await Promise.all(uploadPromises);

            // Return the final public URLs
            return presignedUrls.map((p) => p.file_url);
        } catch (err: any) {
            console.error("Upload failed:", err);
            setError(err.message || "File upload failed");
            throw err;
        } finally {
            setUploading(false);
        }
    }, []);

    const uploadSingleFile = useCallback(async (file: File): Promise<string> => {
        const urls = await uploadFiles([file]);
        return urls[0];
    }, [uploadFiles]);

    return {
        uploadFiles,
        uploadSingleFile,
        uploading,
        error,
    };
}
