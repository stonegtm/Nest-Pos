
export const response = async (
    result: boolean,
    status: number,
    message: string,
    data?: any,
    error?: any,
) => {
    // const encrypt = await encryptData(data);
    // console.log('process.env.ENV=======:: ', process.env.ENV);
    return {
        result,
        status,
        message,
        // ...(data ? { data: encrypt } : {}),
        data,
        ...(process.env.ENV !== '1' && { dataENC: data }),
        ...(error && { error: error }),
    };
};

export interface response {
    result: boolean;
    status: number;
    message: string;
    data?: any;
    error?: any;
}
