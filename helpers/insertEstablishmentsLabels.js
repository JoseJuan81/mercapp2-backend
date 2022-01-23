const insertEstablishmentsLabels = ( objectPrices, labels ) => {

    const establishments = Object.keys( objectPrices );
    const unique = new Set([...labels, ...establishments])
    return [...unique];

}

module.exports = insertEstablishmentsLabels