/**
 * Determine if a key looks close enough to an MPTT path that we can treat it like one.
 * @param candidate The key to prop for MPTT-path-likeness.
 */
const isMPTTPath = (candidate: string) =>
  candidate.length % 4 === 2 && !!candidate.match(/[P,L]-[0-9A-Z]{4,}/);

/**
 * Use entity MPTT paths to determine if one is a parent of the other. Will always return false if
 * either the parent or child key is not an MPTT path.
 * @param parentKey The potential parent entity key.
 * @param childKey The potential child entity key.
 */
export const isMPTTParentOf = (parentKey: string, childKey: string) =>
  isMPTTPath(parentKey) &&
  isMPTTPath(childKey) &&
  childKey.substr(2).startsWith(parentKey.substr(2));

/**
 * Use entity MPTT paths to determine if one is a parent of the other. Will always return false if
 * either the parent or child key is not an MPTT path.
 * @param parentKey The potential parent entity key.
 * @param childKey The potential child entity key.
 */
export const isMPTTChildOf = (childKey: string, parentKey: string) =>
  // Just reverse the arguments to make a utility `isChildOf` from `isParentOf`
  isMPTTParentOf(parentKey, childKey);
