export interface IConfig {
    baseUrl: string;
}
  
export const getConfig = (): IConfig => ({
    baseUrl: import.meta.env.VITE_BASE_URL
});