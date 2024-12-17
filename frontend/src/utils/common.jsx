export const updateFavourites = (id, favourites) => {
  
    if(favourites?.includes(id)){
  
      return favourites.filter((resId) => resId !== id) 
  
    }else{
  
      return [...favourites, id]                        
  
    }
  
  }
  
  export const checkFavourites = (id, favourites) => {
    return favourites?.includes(id) ? '#8ac243' : "white"
  }
  
  export const validateString = (value) => {
    console.log(value);
  
  
    if (value === null || value === undefined || value.length < 3) {
      return "Must have at least 3 characters";
    }
    return null;
  }