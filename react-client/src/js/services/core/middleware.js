const axios = require('axios')



const coreMiddleware = (function () {
    return store => next => action => {
        switch (action.type){
            case "TSP_HELD_KARP":
            axios({
                method: 'POST', 
                url: '/tspheldkarp',
                data: {
                    targets: [
                    50, 4000, 100, 80000, 20000
                ]}
            }).then(res => {
                action.path = res.data.path;
                next(action)
            }).catch(err => {
                console.error(err)
            })
                break;
            default:
                break;
        }
    }
})();

export default coreMiddleware;