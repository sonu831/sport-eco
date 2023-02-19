type Request<T> = {
  key: T;
  value: any;
};

type UpdateStateRequest<T> = Request<T> | Request<T>[];

export { UpdateStateRequest };
