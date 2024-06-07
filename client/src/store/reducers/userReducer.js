const initialValues={
      user:{}
}
export const userReducer=(state=initialValues,action)=>{
    switch(action.type){
        case "User_details" :
            state.user=action.payload;
            return {user : state.user}
        default :
        return state;
    }
}