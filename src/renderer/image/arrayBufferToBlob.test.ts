import { describe, it, expect } from 'vitest';
import arrayBufferToBlob from './arrayBufferToBlob';

describe('arrayBufferToBlob', () => {
  it('should convert an ArrayBuffer to a Blob with the default type (image/svg+xml)', () => {
    const buffer = new ArrayBuffer(8);
    const blob = arrayBufferToBlob(buffer);
    
    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe('image/svg+xml');
    expect(blob.size).toBe(8);
  });

  it('should convert an ArrayBuffer to a Blob with a specified type', () => {
    const buffer = new ArrayBuffer(4);
    const blob = arrayBufferToBlob(buffer, 'image/png');
    
    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe('image/png');
    expect(blob.size).toBe(4);
  });

  it('should handle empty ArrayBuffers', () => {
    const buffer = new ArrayBuffer(0);
    const blob = arrayBufferToBlob(buffer, 'image/png');
    
    expect(blob).toBeInstanceOf(Blob);
    expect(blob.size).toBe(0);
  });
});
