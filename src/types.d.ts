/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="next/image-types/global" />

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
} 