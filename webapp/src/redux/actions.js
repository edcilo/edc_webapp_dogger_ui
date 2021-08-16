import { 
  RESERVATIONS_SET, 
  RESERVATION_CREATE, 
  RESERVATION_UPDATE, 
  RESERVATION_DELETE,
  WALKERS_SET,
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


export const walkersSet = ({ walkers }) => ({
  type: WALKERS_SET,
  payload: { walkers }
})


export const reservationsSet = ({ reservations }) => ({
  type: RESERVATIONS_SET,
  payload: { reservations }
})

export const reservationAdd = ({ reservation }) => ({
  type: RESERVATION_CREATE,
  payload: { reservation }
})

export const reservationUpdate = ({ reservation }) => ({
  type: RESERVATION_UPDATE,
  payload: { reservation }
})

export const reservationDelete = ({ reservation}) => ({
  type: RESERVATION_DELETE,
  payload: { reservation }
})
