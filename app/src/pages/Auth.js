import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function Auth({ children }) {

  const history = useHistory();

  useEffect(() => {
    async function fetchUser() {
      const token = await localStorage.getItem('token');

      if (token) {
        history.push('');
      }
    }

    fetchUser();
  });


  return <>
    {children}
  </>;
}