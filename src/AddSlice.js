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
        update: (state, action) => {
            const index = state.value.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
              state.value[index] = action.payload;
            }
          },
    }

})
export const {add,update}=AddSlice.actions;
export default AddSlice.reducer;
