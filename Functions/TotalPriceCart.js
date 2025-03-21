async function TotalPriceItems(CartItems) {
  const VirtualCart = CartItems;
  let Total = 0;

  VirtualCart.map((item) => {
    Total += item.priceAfterDis * item.count;
  });
  return Total;
}

module.exports = TotalPriceItems;
