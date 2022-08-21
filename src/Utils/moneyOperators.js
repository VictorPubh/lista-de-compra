export const getFormatMoney = (amount) => {
    return `R$ ${amount.toLocaleString('Pt-Br', { minimumFractionDigits: 2 })}`;
}