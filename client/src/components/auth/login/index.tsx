import {  useContext, useState } from 'react';
import { Input } from '../../shared/input';
import { Title } from '../../shared/title';
import { IUserLogin } from '../../../interfaces/IUser';
import { Button } from '../../shared/button';

import { logger } from '../../../services/SLogger';
import { validateField } from '../../../services/SFieldValidation';
import { fieldValidations } from '../../../utils/formValidation';
import { API } from '../../../services/SApi';
import { useNavigate } from 'react-router-dom';
import { isEmpty } from '../../../utils/checkString';
import { IAppContext } from '../../../interfaces/IContext';
import { AppContext } from '../../../context/ctx';
import { ENotifType } from '../../../enums/ENotification';
import { EStatusCode } from '../../../enums/EStatusCode';

import style from '../style.module.scss';


type LoginProp = {
  switchPage: (newPage: string) => void;
}


export const Login : React.FunctionComponent<LoginProp> = ({switchPage}) => {
  const title = "Sign in";

  const appContext = useContext<IAppContext | null>(AppContext);

  const navigate = useNavigate();

  const [data, setData] = useState<IUserLogin>({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState<IUserLogin>({
    email : "",
    password : ""
  });

  const handleOnChange = (name: string, value: string) => {
    const errorMessage = validateField(value, fieldValidations[name]);

    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: errorMessage || ""
    }));

    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  }

  const handleSubmit = async () => 
  {
    if (isEmpty(data.email) || isEmpty(data.password))
    {
      logger.error("WE CAN'T PROCESS LOGIN !")  
      return;
    }

    if (Object.values(errors).every((error) => !isEmpty(error))) {
      logger.error("WE CAN'T PROCESS LOGIN !")  
      return; 
    }
    
    const {email, password } = data;

    try {
      const res = await API.Post("auth/login", { email, password });
      logger.debug(res.data)
      if (res.status === EStatusCode.SUCCESS) {

        appContext?.setNotif({
          txt: "You have been connected",
          type: ENotifType.SUCCESS,
          bShow : true
        });

        navigate("/");
      }
    }catch(error)
    {
      logger.error("Login failed: Invalid credentials");
    }
  }

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <Title className='title' txt={title} />
        <Input
          label="Email"
          className="input"
          value={data.email}
          onChange={(e: string) => handleOnChange("email", e)}
          error={errors['email']}
          />
          
        <Input
          label="Password"
          type="password"
          className="input"
          value={data.password}
          onChange={(e: string) => handleOnChange("password", e)}
          error={errors['password']}
        />

        <a href="" className='blue link'>Forgot your password?</a>

        <Button className="btn bg-blue mb-5 w-100-percentage" value="Sign in" onClick={handleSubmit} />

        <p className={`${style.new_text}`}>No Account?</p>

        <Button className="btn bg-gray w-70-percentage" value="Create your account" onClick={() => switchPage("register")} />
      </div>
    </div>
  )
}