export type chartType={
    show:boolean,
    data:any
}

const initialState:chartType={
    show:false,
    data:null
}

const ChartReducer=(state=initialState,action:any)=>{
    switch(action.type){
        case "OPEN":
            return {
                ...state,
                show:true,
                data:[]
            }
        case "CLOSE":
            return {
                ...state,
                show:false,
                data:[]
            }
        default:
            return state;
    }
}

export default ChartReducer;