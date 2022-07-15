export const shortenAddress = (address) => {
  console.log('address ', address);
  let first = address.substr(0, 5);
  let last = address.substr(address.length - 3, address.length - 1);
  return `${first}.........${last}`;
};
