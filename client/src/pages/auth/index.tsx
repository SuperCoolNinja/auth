import { useState } from "react";
import { Login } from "../../components/auth/login"
import { Register } from "../../components/auth/register";

export const AuthPage = () => 
{
  const [page, setPage] = useState<string>("login");

  return (
    <div>
      {page === "login" ? <Login switchPage={setPage}/> : <Register switchPage={setPage}/>}
    </div>
  )
}