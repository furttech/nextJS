export const formatCurrency = (amount: number) => {
    return (amount / 100).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };
  
  export const formatDateToLocal = (
    dateStr: string,
    locale: string = 'en-US',
  ) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    };
    const formatter = new Intl.DateTimeFormat(locale, options);
    return formatter.format(date);
  };

  export const addMillisecondsToDate = (milliSeconds: number, dateString?: string, dateMilliseconds?: number) : number => {

    let curDateInMilliSeconds:number|null = null;

    if(!dateString && dateMilliseconds){
      curDateInMilliSeconds = dateMilliseconds;

    }else if(dateString && !dateMilliseconds){
      curDateInMilliSeconds = Date.parse(dateString);

    }else{
      curDateInMilliSeconds = new Date().getMilliseconds();
    }

    return curDateInMilliSeconds += milliSeconds;

  }