"use client";

import { useState, useCallback } from "react";
import imageCompression from "browser-image-compression";
import { uploadService } from "../services/upload.service";

export function useUpload() {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const uploadFiles = useCallback(async (files: File[]): Promise<string[]> => {
        if (files.length === 0) return [];

        setUploading(true);
        setError(null);

        try {
            // Step 0: Compress image files if needed (Max 500KB)
            const processedFiles = await Promise.all(
                files.map(async (file) => {
                    const isImage = ["image/jpeg", "image/jpg", "image/png"].includes(file.type);
                    const isOverSize = file.size > 500 * 1024; // 500KB

                    if (isImage && isOverSize) {
                        try {
                            const options = {
                                maxSizeMB: 0.5,
                                maxWidthOrHeight: 1920,
                                useWebWorker: true,
                            };
                            const compressedFile = await imageCompression(file, options);
                            // Important: ensure we return a File object with original name and type
                            return new File([compressedFile], file.name, {
                                type: file.type,
                                lastModified: Date.now(),
                            });
                        } catch (err) {
                            console.error(`Compression failed for ${file.name}:`, err);
                            return file;
                        }
                    }
                    return file;
                })
            );

            // Step 1: Request presigned URLs
            const request = {
                files: processedFiles.map((f) => ({
                    file_name: f.name,
                    file_type: f.type,
                })),
            };

            const presignedUrls = await uploadService.getPresignedUrls(request);

            // Step 2: Upload Files to S3 in parallel
            const uploadPromises = processedFiles.map((file, index) => {
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
