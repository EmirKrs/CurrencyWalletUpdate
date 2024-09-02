const maxLenght = 16;
export const shortenName = (name) => {
    if (name.length > maxLenght) {
      return name.substring(0, maxLenght - 3) + "..."; // Son üç karakteri '...' olarak değiştir
    }
    return name;
  };

  export const balanceNumberFormat = (num) => {
    if(num === undefined){
      return;
    } 
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };