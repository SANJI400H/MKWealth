/**
 * Private investor guides. Object paths are storage keys, never public URLs.
 * Drive folder order. There is no Guide 05 in the source folder.
 * Import this only from server code.
 */

export const GUIDE_VIDEO_BUCKET = "guide-videos";

export type PrivateGuide = {
  id: string;
  title: string;
  objectPath: string;
};

export const privateGuides: readonly PrivateGuide[] = [
  { id: "guide-01", title: "Guide 01", objectPath: "guide-01/index.m3u8" },
  { id: "guide-02", title: "Guide 02", objectPath: "guide-02/index.m3u8" },
  { id: "guide-03", title: "Guide 03", objectPath: "guide-03/index.m3u8" },
  { id: "guide-04", title: "Guide 04", objectPath: "guide-04/index.m3u8" },
  { id: "guide-06", title: "Guide 06", objectPath: "guide-06/index.m3u8" },
  { id: "guide-07", title: "Guide 07", objectPath: "guide-07/index.m3u8" },
  { id: "guide-08", title: "Guide 08", objectPath: "guide-08/index.m3u8" },
];

const byId = new Map(privateGuides.map((guide) => [guide.id, guide]));

export function getPrivateGuide(id: string): PrivateGuide | null {
  return byId.get(id) ?? null;
}
