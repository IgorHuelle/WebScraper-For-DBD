export const useCloneNode = (element: Element) => {
  return element.cloneNode(true) as Element
}