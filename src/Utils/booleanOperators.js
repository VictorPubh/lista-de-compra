export const isTrue = (sample) => {
    const regEx = /^\s*(true|1|on)\s*$/i;
    return regEx.test(sample);
}