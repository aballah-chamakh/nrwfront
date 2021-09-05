
const initialState = {
  trans_company_authenticated: false,


}
const Reducer = (state = initialState, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    // Para Authentication related actions
    case 'trans_company_login':
      newState.trans_company_authenticated = true
      return newState
      break
    case 'trans_company_logout':
      newState.trans_company_authenticated = false
      localStorage.clear()
      return newState
      break;
    default:
      return newState;

  }

}
export default Reducer;