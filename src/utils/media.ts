import path from "path";

const mediaTypes: { [key: string]: string[] } = {
  'image': ['jpg', 'jpeg', 'png', 'gif', 'webp'],
  'video': ['mp4', 'webm'],
};

export type MediaType = {
    Image: 'image',
    Video: 'video',
    Unknown: 'unknown',
};

export const getMediaType = (uri: string) => {
    const ext = uri.split('.').pop();
    if (!ext) return 'unknown';
    return Object.keys(mediaTypes).find((type: string) => mediaTypes[type].includes(ext)) || 'unknown';
}
