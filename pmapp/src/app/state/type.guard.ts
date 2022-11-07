export function isString (value: string | null): value is string {
  return (value as string) !== null ;
};
