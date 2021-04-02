export function greeting() {
  const currentHour = new Date().getHours();
  if (currentHour < 12 || currentHour === 0) {
    return "Good morning";
  } else if (currentHour < 16) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
}

// export const maintainSession = () => {
//   const user_token = localStorage.getItem("user_token");
//   if (user_token) {
//     const decoded = jwt_decode(user_token);
//     updateStore(decoded);
//   } else {
//     history.pushState("/");
//   }
// };

// export const updateStore = (user) => {
//   const { acctNum, password } = user;
//   store.dispatch(
//     signIn({
//       acctNum,
//       password,
//       token: localStorage.getItem("user_token"),
//     })
//   );
//   store.dispatch(initiateGetProfile(acctNum));
// };
