import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    uid: '',
    data: {
            
        }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUid: (state, action) => {
      state.uid = action.payload
    },
  },
})


export const { setUid } = userSlice.actions

export default userSlice.reducer