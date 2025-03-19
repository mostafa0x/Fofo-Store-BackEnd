async function TotalPriceItems(CartItems) {
  const VirtualCart = CartItems;
  let Total = 0;

  VirtualCart.map((item) => {
    itemPir = item.price - item.price * (item.DisPercentage / 100);
    Total += itemPir * item.count;
  });
  return Math.ceil(Total);
}

module.exports = TotalPriceItems;
