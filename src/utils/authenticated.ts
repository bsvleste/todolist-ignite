export const isAuthenticated = () => {
  const token = localStorage.getItem('@apptodo:credential')
  return token !== null
}
