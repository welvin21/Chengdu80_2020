export const truncateText = (text, limit = 30) => {
    if(text.length < limit) {
        return text;
    } else {
        return `${text.slice(0, limit)}...`;
    }
}