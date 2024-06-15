function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function getRandomOption(options) {
    if (!options || !Array.isArray(options) || options.length === 0) {
      throw new Error("Invalid options array.");
    }
  
    const shuffledOptions = [...options];
  
    shuffle(shuffledOptions);
  
    const randomOption = shuffledOptions.pop();
  
    return randomOption;
  }
  
  module.exports = {
    getRandomOption,
  };
  
  
