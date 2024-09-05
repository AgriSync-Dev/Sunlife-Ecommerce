import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

const CurrencyConvertComp = ({ amount }) => {
    const { currency, currencyConvertedRate } = useSelector((state) => state.user);
    let convertedAmt = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency || "GBP",
        minimumFractionDigits: 0
    }).format(Number(amount * currencyConvertedRate).toFixed(2) || 0)
    let amt = convertedAmt.match(/[\d\.\,]+/g)

    let withSpace= convertedAmt.replace(amt, ` ${amt}`)

    return (
        <span>{withSpace}</span>
    )
}

export default CurrencyConvertComp