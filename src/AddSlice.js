import {createSlice} from '@reduxjs/toolkit'

const initialState={
    value:{
        id:null,
        title:'',
        body:'',
        buttonClicked:false,
    }
}

const AddSlice=createSlice({
    name:'add',
    initialState:initialState,
    reducers:{
        add:(state,action)=>{
            state.value=action.payload
        },
    }

})
export const {add}=AddSlice.actions;
export default AddSlice.reducer;
