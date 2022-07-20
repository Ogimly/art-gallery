import Control from '../common/control';

export function toggleItem<I>(arr: Array<I>, item: I): Array<I> {
  const set = new Set(arr);

  if (set.has(item)) {
    set.delete(item);
  } else {
    set.add(item);
  }

  return [...set];
}

export function addItem<I>(arr: Array<I>, item: I): Array<I> {
  const set = new Set(arr);

  if (!set.has(item)) set.add(item);

  return [...set];
}

export function removeItem<I>(arr: Array<I>, item: I): Array<I> {
  const set = new Set(arr);

  if (set.has(item)) set.delete(item);

  return [...set];
}

export function clear(parent: Control) {
  const element = parent.node;
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
