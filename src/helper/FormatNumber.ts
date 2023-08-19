export const formatNumber = (number: number): string => {
    if (number < 1000) {
        return number.toString();
    } else if (number < 1000000) {
        const roundedNumber = (number / 1000).toFixed(1);
        return `${roundedNumber}K`;
    } else {
        const roundedNumber = (number / 1000000).toFixed(1);
        return `${roundedNumber}M`;
    }
};
