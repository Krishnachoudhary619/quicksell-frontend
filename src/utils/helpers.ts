export const extractData = <T>(response: any): T => {
    return response.data.data;
};
