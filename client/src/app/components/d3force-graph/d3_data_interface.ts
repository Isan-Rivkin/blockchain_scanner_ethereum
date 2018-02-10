/**
 * Created by Tomer on 09/02/2018.
 */
export interface INode {

  id: string,
  group: number,
  address:string
}
export interface ILink {
source: string,
  target: string,
  value: number
}

export interface IData {
  nodes: any,
  links:any
}
