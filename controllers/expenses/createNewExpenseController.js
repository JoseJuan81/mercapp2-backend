const { response } = require('express');
const R = require('ramda');

const UserModel = require('../../models/User');

const createNewExpenseController = async ( req, res = response ) => {

    try {

        const { uid: userId, body: { category, establishment, items: incomingItems } } = req;

        const user = await UserModel.findByIdAndUpdate(
            userId,
            { $push: {
                expenses: { ...req.body }
            }},
            { new: true }
        );

        if ( !user ) {
            return UserNotExist( res ); 
        }
        // Actualizar items
        updateItems({ incomingItems, user });
        
        // Actualizar establishments
        updateEstablishments({ establishment, user });
    
        // Actualizar category
        updateCategories({ category, user });

        await user.save();
    
        return res.status( 201 ).json({
            ok: true,
            msg: 'Gasto creado exitosamente',
            data: R.last(user.expenses),
        })

    } catch( err ) {
        console.log('Error creando el nuevo gasto', err);
        return res.status( 400 ).json({
            ok: false,
            msg: 'Error creando el gasto',
            data: err,
        })
    }

}

const UserNotExist = ( res ) => {
    return res.status( 404 ).json({
        ok: false,
        msg: 'Usuario no existe',
    })
}

const updateEstablishments = ({ establishment, user }) => {
    const establishmentIndex = R.findIndex( R.propEq( 'name', R.toLower(establishment.name) ), user.establishments );

    R.cond([
        [() => establishmentIndex > -1, () => user.establishments[establishmentIndex].numberOfTimesUsed += 1],
        [R.T, () => user.establishments.push( establishment )]
    ])()
}

const updateCategories = ({ category, user }) => {
    const categorytIndex = R.findIndex(
        el => R.toLower(category.name) === R.toLower( el.name ),
        user.categories
    );

    R.cond([
        [() => categorytIndex > -1, () => user.categories[categorytIndex].numberOfTimesUsed += 1],
        [R.T, () => user.categories.push({ ...category, numberOfTimesUsed: 1 } )]
    ])() 
}

const updateItems = ({ incomingItems, user }) => {
    R.forEach( item => {
    
        const userItemIndex = R.findIndex( R.propEq( '_id', item.id ), user.items );

        R.cond([
            [() => userItemIndex > -1, R.always( R.inc( user.items[userItemIndex].numberOfTimesBuyed ) )],
            [R.T, R.always( user.items.push( item ) )]
        ])()
        
    }, incomingItems );
}

module.exports = createNewExpenseController;