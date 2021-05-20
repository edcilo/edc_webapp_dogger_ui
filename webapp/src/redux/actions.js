import { 
  ACTIVITIES_SET, 
  ACTIVITY_CREATE, 
  ACTIVITY_UPDATE, 
  ACTIVITY_DELETE,
  USER_LOGIN, 
  USER_LOGOUT
} from "./actionTypes";


export const userLogin = ({access, refresh, data}) => ({
  type: USER_LOGIN,
  payload: { 
    token: access,  
    refresh: refresh,
    data: data,
  }
})

export const userLogout = () => ({
  type: USER_LOGOUT,
  payloud: {}
})


export const activitiesSet = ({ activities }) => ({
  type: ACTIVITIES_SET,
  payload: { activities }
})

export const activityAdd = ({ activity }) => ({
  type: ACTIVITY_CREATE,
  payload: { activity }
})

export const activityUpdate = ({ activity }) => ({
  type: ACTIVITY_UPDATE,
  payload: { activity }
})

export const activityDelete = ({ activity}) => ({
  type: ACTIVITY_DELETE,
  payload: { activity }
})
