const textures = new Map();

// Both animations reuse these decoded, small textures rather than the large PNGs.
export async function loadRenderTextures(sources) {
  return (await Promise.all(sources.filter(src => !/\/s\.png$/i.test(src)).map(src => {
    if (!textures.has(src)) textures.set(src, (async () => {
      const image = new Image();
      image.decoding = 'async';
      image.src = src;
      try {
        await image.decode();
        const texture = document.createElement('canvas');
        texture.width = Math.min(512, image.naturalWidth);
        texture.height = Math.round(texture.width * image.naturalHeight / image.naturalWidth);
        const context = texture.getContext('2d');
        if (!context) return null;
        context.imageSmoothingQuality = 'high';
        context.drawImage(image, 0, 0, texture.width, texture.height);
        return { texture, naturalWidth: image.naturalWidth, naturalHeight: image.naturalHeight };
      } catch { return null; }
    })());
    return textures.get(src);
  }))).filter(Boolean);
}
