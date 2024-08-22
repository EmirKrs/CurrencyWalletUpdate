const maxLenght = 16;
const shortenName = (name) => {
    if (name.length > maxLenght) {
      return name.substring(0, maxLenght - 3) + "..."; // Son üç karakteri '...' olarak değiştir
    }
    return name;
  };

export {shortenName};