async function TotalPriceItems(CartItems) {
  const VirtualCart = CartItems;
  let Total = 0;

  VirtualCart.map((item) => {
    Total += parseInt(item.price * item.count);
  });
  return parseInt(Total);
}

module.exports = TotalPriceItems;
