import IMessageResponse from './IMessageResponse';

export default interface IErrorResponse extends IMessageResponse {
  stack?: string;
}