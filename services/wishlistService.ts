export const getWishlist = (): string[] => {
  try {
    const stored = localStorage.getItem('mali_safi_wishlist');
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    return [];
  }
};

export const toggleWishlist = (id: string): boolean => {
  const list = getWishlist();
  const index = list.indexOf(id);
  let newList;
  let isAdded = false;
  
  if (index === -1) {
    newList = [...list, id];
    isAdded = true;
  } else {
    newList = list.filter(item => item !== id);
  }
  
  localStorage.setItem('mali_safi_wishlist', JSON.stringify(newList));
  // Dispatch a custom event so other components can react
  window.dispatchEvent(new Event('wishlist-updated'));
  return isAdded;
};

export const isInWishlist = (id: string): boolean => {
  return getWishlist().includes(id);
};