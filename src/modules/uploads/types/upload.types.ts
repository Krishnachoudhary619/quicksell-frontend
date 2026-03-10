export interface PresignedUrlRequest {
    files: {
        file_name: string;
        file_type: string;
    }[];
}

export interface PresignedUrlResponse {
    upload_url: string;
    file_url: string;
}
