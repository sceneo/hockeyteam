

export const isDeveloptment = (): boolean => {
    return (!process.env.NODE_ENV || process.env.NODE_ENV === 'development');
}