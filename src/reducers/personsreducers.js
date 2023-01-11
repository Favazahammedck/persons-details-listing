import {PERSONS_LIST_SUCCESS} from '../constants/Personsconstant.js'


export const personsListReducer=(states={persons:[]},actions)=>{
    switch(actions.type){
        case PERSONS_LIST_SUCCESS:
            return {persons:actions.payload}
        default:
            return states
    }
}