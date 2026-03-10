import { api } from "@/services/api";
import { ENDPOINTS } from "@/services/endpoints";
import { PresignedUrlRequest, PresignedUrlResponse } from "../types/upload.types";
import axios from "axios";

export const uploadService = {
    getPresignedUrls: async (request: PresignedUrlRequest): Promise<PresignedUrlResponse[]> => {
        const response = await api.post(ENDPOINTS.UPLOADS.PRESIGNED_URLS, request);
        return response.data.data;
    },

    uploadFileToS3: async (uploadUrl: string, file: File): Promise<void> => {
        // We use a plain axios instance here to avoid sending our API's Authorization header to S3
        await axios.put(uploadUrl, file, {
            headers: {
                "Content-Type": file.type,
            },
        });
    },
};
