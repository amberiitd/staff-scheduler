export function validateDateString(date: string){
  return !isNaN(Date.parse(date));
}
