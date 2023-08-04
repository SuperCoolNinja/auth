import { ENotifType } from "../enums/ENotification";

export interface IAppContext {
  showNotif: {
    txt: string;
    type: ENotifType;
    bShow: boolean;
  };
  setNotif: React.Dispatch<React.SetStateAction<{ txt: string; type: ENotifType; bShow: boolean; }>>;
}