# image-cropper



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute     | Description | Type               | Default     |
| -------------------- | ------------- | ----------- | ------------------ | ----------- |
| `handlersize`        | `handlersize` |             | `string`           | `undefined` |
| `hidefooter`         | `hidefooter`  |             | `string`           | `undefined` |
| `img`                | --            |             | `HTMLImageElement` | `undefined` |
| `inactiveSelections` | --            |             | `(Quad \| Rect)[]` | `undefined` |
| `license`            | `license`     |             | `string`           | `undefined` |
| `quad`               | --            |             | `Quad`             | `undefined` |
| `rect`               | --            |             | `Rect`             | `undefined` |


## Events

| Event              | Description | Type                  |
| ------------------ | ----------- | --------------------- |
| `canceled`         |             | `CustomEvent<void>`   |
| `confirmed`        |             | `CustomEvent<void>`   |
| `selectionClicked` |             | `CustomEvent<number>` |


## Methods

### `detect(source: string | HTMLImageElement | Blob | HTMLCanvasElement) => Promise<DetectedQuadResultItem[]>`



#### Returns

Type: `Promise<DetectedQuadResultItem[]>`



### `getAllSelections(convertTo?: "rect" | "quad") => Promise<(Quad | Rect)[]>`



#### Returns

Type: `Promise<(Quad | Rect)[]>`



### `getCroppedImage(options: CropOptions) => Promise<string>`



#### Returns

Type: `Promise<string>`



### `getPoints() => Promise<[Point, Point, Point, Point]>`



#### Returns

Type: `Promise<[Point, Point, Point, Point]>`



### `getQuad() => Promise<Quad>`



#### Returns

Type: `Promise<Quad>`



### `getRect() => Promise<Rect>`



#### Returns

Type: `Promise<Rect>`



### `resetStates() => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
