import { useContext, useState } from 'react';
import { Button } from '../../shared/button';
import { Input } from '../../shared/input';
import { Title } from '../../shared/title'


import { IUserRegister } from '../../../interfaces/IUser';
import { validateField } from '../../../services/SFieldValidation';
import { fieldValidations } from '../../../utils/formValidation';
import { logger } from '../../../services/SLogger';
import { isEmpty } from '../../../utils/checkString';
import { API } from '../../../services/SApi';
import { EStatusCode } from '../../../enums/EStatusCode';
import { ENotifType } from '../../../enums/ENotification';
import { IAppContext } from '../../../interfaces/IContext';
import { AppContext } from '../../../context/ctx';
import { useNavigate } from 'react-router-dom';

import style from '../style.module.scss'

type RegisterProp = {
  switchPage: (newPage: string) => void;
}

export const Register : React.FunctionComponent<RegisterProp> = ({switchPage}) => 
{
  const title = "Create account";
  
  const appContext = useContext<IAppContext | null>(AppContext);
  const navigate = useNavigate();

  const [data, setData] = useState<IUserRegister>({
    pseudo: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({
    pseudo: "",
    email: "",
    password: ""
  });

  const handleSubmit = async () => 
  {
    if (isEmpty(data.email) || isEmpty(data.pseudo) || isEmpty(data.password) )
    {
      logger.error("WE CAN'T PROCESS LOGIN !")  
      return;
    }

    if (Object.values(errors).every((error) => !isEmpty(error))) {
      logger.error("WE CAN'T PROCESS LOGIN !")  
      return;
    }

    const {pseudo, email, password} = data;

    try 
    {
      const res = await API.Post('auth/register', {pseudo, email, password})
      if (res.status === EStatusCode.SUCCESS) 
      {
        appContext?.setNotif({
          txt: "You have been registered you can now log into your account !",
          type: ENotifType.SUCCESS,
          bShow : true
        });

        navigate("/");
      }
      else if (res.status === EStatusCode.CONFLICT)
      {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [res.field as string]: res.error as string || "",
        }));
      }
    }
    catch(error) 
    {
      logger.error(`Registration failed : ${error}`);
    }
  }

  const handleOnChange = (name: string, value: string) => {
    const errorMessage = validateField(value, fieldValidations[name]);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage || "",
    }));

    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  }

  return (
    <div className={style.container}>
       <div className={style.wrapper}>
          <Title className='title' txt={title}/>
          <Input
            label="Pseudo"
            className="input"
            value={data.pseudo}
            onChange={(e: string) => handleOnChange("pseudo", e)}
            error={errors["pseudo"]}
          />
          <Input
            label="Email"
            className="input"
            value={data.email}
            onChange={(e: string) => handleOnChange("email", e)}
            error={errors["email"]}
          />
          <Input
            label="Password"
            type="password"
            className="input"
            value={data.password}
            onChange={(e: string) => handleOnChange("password", e)}
            error={errors["password"]}
          />
          
          <Button className="btn bg-blue mb-5 w-100-percentage" value="Register" onClick={handleSubmit} />

          <p className={`${style.new_text}`}>Already have an account?</p>
          <Button className="btn bg-gray w-70-percentage" value="Log to your account" onClick={() => switchPage("login")} />
       </div>
    </div>
  )
}