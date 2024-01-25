function toRupiah(value) {
  return value.toLocaleString("id-ID", {
     style: "currency",
     currency: "IDR",
    });
  }
  
  function age(value) {
    const now = new Date();
    return (value = now.getFullYear() - value.getFullYear());
}
  module.exports = { toRupiah, age };

