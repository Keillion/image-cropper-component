/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface ImageCropper {
        "img"?: HTMLImageElement;
    }
}
declare global {
    interface HTMLImageCropperElement extends Components.ImageCropper, HTMLStencilElement {
    }
    var HTMLImageCropperElement: {
        prototype: HTMLImageCropperElement;
        new (): HTMLImageCropperElement;
    };
    interface HTMLElementTagNameMap {
        "image-cropper": HTMLImageCropperElement;
    }
}
declare namespace LocalJSX {
    interface ImageCropper {
        "img"?: HTMLImageElement;
    }
    interface IntrinsicElements {
        "image-cropper": ImageCropper;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "image-cropper": LocalJSX.ImageCropper & JSXBase.HTMLAttributes<HTMLImageCropperElement>;
        }
    }
}
