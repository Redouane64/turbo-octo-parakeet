// NOTE: these type duplicated in both service. in real world it
// is recommended to move it in a common contracts package
export interface IJob {
  n: number;
}

export interface IJobReply {
  n: string;
  double: number;
}
