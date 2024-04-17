type GenericObject = { [key: string]: string | number | undefined }

interface generateUrlConfig {
  searchParams: GenericObject;
  baseUrl: string;
}

export const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
  let timeout: NodeJS.Timeout

  return (...args: Parameters<F>): Promise<ReturnType<F>> =>
    new Promise(resolve => {
      if (timeout) clearTimeout(timeout)
      

      timeout = setTimeout(() => {
        resolve(func(...args))
      }, waitFor)
    })
}

export const generateUrl = (config: generateUrlConfig) => {
  const { searchParams, baseUrl } = config;

  const filteredSearchParams = Object.entries(searchParams)
    // cast to string so that it doesn't ignore `0`
    .filter(([, value]) => value !== undefined && !!String(value))
    .map(([key, value]) => [key, value!.toString()]);

  const url = new URL(baseUrl);
  url.search = new URLSearchParams(filteredSearchParams).toString();

  return url.href;
};