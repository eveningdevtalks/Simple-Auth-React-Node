import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function Auth({ children }) {

  const history = useHistory();

  useEffect(() => {
    function fetchUser() {
      const token = localStorage.getItem('token');

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