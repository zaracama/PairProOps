
function findGamePrice(categoriesData, gameTitle) {
   const category = categoriesData.find(category => category.name === gameTitle);
   return category ? formatCurrency(category.cost) : 'Not available';
 }
 
 function formatCurrency(amount) {
   return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
 }
 
 module.exports = { findGamePrice, formatCurrency };
 
 