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

  export async function createFile(url) {
    let response = await fetch(url);
    let data = await response.blob();
    let metadata = {
      type: 'image/jpeg'
    };
    let file = new File([data], `${Date.now()}.jpg`, metadata);
    return file
    // ... do something with the file or return it
  }