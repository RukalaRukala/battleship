interface IDataReq {
  name: string;
  password: string;
}

interface IDataRes {
  name: string;
  index: number;
  error: boolean;
  errorText: string;
}

export interface ILoginRequest {
  type: string;
  data: IDataReq;
  id: number;
}

export interface ILoginResponse {
  type: string;
  data: IDataRes;
  id: number;
}
