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
                    1, 4, 100, 20, 80
                ]}
            }).then(res => {
                console.log(res)
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