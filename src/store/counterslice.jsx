import { createSlice } from '@reduxjs/toolkit'








const initialState = {

  current_user: { username: "none", photoURL: "https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg" },

  questions: [{ ques: "", options: [] }],

  names: [],

  score: []




}





export const counterSlice = createSlice({

  name: 'counter',

  initialState,


  reducers: {






    set_user: (state, payload) => {

      // console.log(payload.payload)

      state.current_user = payload.payload



    },



    load_ques: (state, payload) => {

      state.questions = payload.payload
      console.log(payload.payload)

    },



    setting_charts: (state, payload) => {
      
      // console.log(payload.payload)

      const names = []
      const score = []
      payload.payload.map( v => names.push(v.username) )
      payload.payload.map( v => score.push(v.score) )

      console.log(names , score)
    

      state.names = names
      state.score = score

      
    }










  },
})




export const { set_user, load_ques, save_chat, setting_charts } = counterSlice.actions

export default counterSlice.reducer