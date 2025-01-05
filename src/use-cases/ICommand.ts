export interface IRequest<T = ICommand> {
    Handle(command:T):void;
}

export type ICommand = {};