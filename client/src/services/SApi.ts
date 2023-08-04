/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { logger } from './SLogger';

const URL_API = `http://localhost:3000`;


export const API = {
    async Get(route : string) : Promise<{ status: number, data?: any, error?: string }>
    {
        try 
        {
          const response = await axios.get(`${URL_API}/${route}`);
      
          return {
            status: response.status,
            data: response.data
          }
        }catch(e : any)
        {
          logger.error(e)
          return {
            status: 500,
            error: `Error occurred on fetch: ${e}`
          }
        }
    },

    async Post<T>(route: string, payload: T): Promise<{ status: number, data?: any, field?: string, error?: string }> {
      try {
        const response = await axios.post(`${URL_API}/${route}`, payload);
    
        return {
          status: response.status,
          data: response.data,
          field: response.data.field,
        };
      } catch (e: any) {
        logger.error(e);
        if (e.response && e.response.status === 409) {
          return {
            status: e.response.status,
            error: e.response.data.error,
            field: e.response.data.field,
          };
        } else {
          return {
            status: 500,
            error: `Error occurred on fetch: ${e}`,
          };
        }
      }
    },
    async Put<T>(route: string, payload: T): Promise<{ status: number, data?: any, error?: string }> {
      try {
        const response = await axios.put(`${URL_API}/${route}`, payload);
        return {
          status: response.status,
          data: response.data
        };
      } catch (e: any) {
        logger.error(e);
        return {
          status: 500,
          error: `Error occurred on fetch: ${e}`
        };
      }
      
    }
}