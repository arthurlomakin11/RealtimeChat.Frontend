import {container} from "./inversify.config";

export function useInjection<T>(name: string): T {
    return container.get(name);
}