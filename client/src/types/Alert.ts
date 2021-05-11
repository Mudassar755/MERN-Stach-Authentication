export interface IAlert {
    msg: string
    alertType: string
  }
  
  export type AlertState = {
    alerts: IAlert[]
  }
  
  export type AlertAction = {
    type: string
    payload:string
    alert: IAlert
  }
  
  export type AlertDispatchType = (args: AlertAction) => AlertAction