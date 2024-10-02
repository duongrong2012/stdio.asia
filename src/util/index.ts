export const formatCurrency = (text = '') => {
    return text.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  
  export const readFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader);
      reader.onerror = error => reject(error);
    });
  }