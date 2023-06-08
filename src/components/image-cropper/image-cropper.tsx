import { Component, Event, EventEmitter, Fragment, Host, Prop, State, Watch, h } from '@stencil/core';

export interface Quad{
  points:[Point,Point,Point,Point];
}

export interface Point{
  x:number;
  y:number;
}

export interface Rect{
  x:number;
  y:number;
  width:number;
  height:number;
}

@Component({
  tag: 'image-cropper',
  styleUrl: 'image-cropper.css',
  shadow: true,
})
export class ImageCropper {
  handlers:number[] = [0,1,2,3,4,5,6,7];
  @Prop() img?: HTMLImageElement;
  @Prop() rect?: Rect;
  @Prop() quad?: Quad;
  @State() viewBox:string = "0 0 1280 720";
  @State() points:[Point,Point,Point,Point] = undefined;
  @Event() confirmed?: EventEmitter<void>;
  @Event() canceled?: EventEmitter<void>;

  @Watch('img')
  watchImgPropHandler(newValue: HTMLImageElement) {
    if (newValue) {
      this.viewBox = "0 0 "+newValue.naturalWidth+" "+newValue.naturalHeight;
    }
  }

  @Watch('rect')
  watchRectPropHandler(newValue: Rect) {
    if (newValue) {
      const point1:Point = {x:newValue.x,y:newValue.y};
      const point2:Point = {x:newValue.x+newValue.width,y:newValue.y};
      const point3:Point = {x:newValue.x+newValue.width,y:newValue.y+newValue.height};
      const point4:Point = {x:newValue.x,y:newValue.y+newValue.height};
      this.points = [point1,point2,point3,point4];
    }
  }

  @Watch('quad')
  watchQuadPropHandler(newValue: Quad) {
    if (newValue) {
      this.points = newValue.points;
    }
  }

  onCanceled(){
    console.log("canceled");
    console.log(this.canceled);
    if (this.canceled){
      console.log("emit");
      this.canceled.emit();
    }
  }

  onConfirmed(){
    console.log("confirmed");
    if (this.confirmed){
      this.confirmed.emit();
    }
  }

  getPointsData(){
    if (this.points) {
      let pointsData = this.points[0].x + "," + this.points[0].y + " ";
      pointsData = pointsData + this.points[1].x + "," + this.points[1].y +" ";
      pointsData = pointsData + this.points[2].x + "," + this.points[2].y +" ";
      pointsData = pointsData + this.points[3].x + "," + this.points[3].y;
      return pointsData;
    }
    return "";
  }

  renderHandlers(){
    if (!this.points) {
      return (<div></div>)
    }
    return (
      <Fragment>
        {this.handlers.map(index => (
          <rect 
            x={this.getHandlerX(index)} 
            y={this.getHandlerY(index)} 
            width={this.getHandlerSize()}
            height={this.getHandlerSize()} 
            stroke="green" 
            stroke-width="2"
            fill="transparent"
          />
        ))}
      </Fragment>
    )
  }

  renderHandlersMaskDefs(){
    if (!this.points) {
      return (<div></div>)
    }
    return (
      <defs>
        <mask id="myMask">
          <rect 
            x="0" 
            y="0" 
            width={this.img ? this.img.naturalWidth : "0"}
            height={this.img ? this.img.naturalHeight : "0"}
            fill="white" />
          {this.handlers.map(index => (
            <rect 
              x={this.getHandlerX(index)} 
              y={this.getHandlerY(index)} 
              width={this.getHandlerSize()}
              height={this.getHandlerSize()} fill="black" 
            />
          ))}
        </mask>
      </defs>
    )
  }

  getHandlerX(index:number) {
    let x = 0;
    let size = this.getHandlerSize();
    if (index === 0){
      x = this.points[0].x;
    }else if (index === 1) {
      x = this.points[0].x + (this.points[1].x - this.points[0].x)/2;
    }else if (index === 2) {
      x = this.points[1].x;
    }else if (index === 3) {
      x = this.points[1].x + (this.points[2].x - this.points[1].x)/2;
    }else if (index === 4) {
      x = this.points[2].x;
    }else if (index === 5) {
      x = this.points[3].x + (this.points[2].x - this.points[3].x)/2;
    }else if (index === 6) {
      x = this.points[3].x;
    }else if (index === 7) {
      x = this.points[0].x + (this.points[3].x - this.points[0].x)/2;
    }
    x = x - size/2;
    return x;
  }

  getHandlerY(index:number) {
    let y = 0;
    let size = this.getHandlerSize();
    if (index === 0){
      y = this.points[0].y;
    }else if (index === 1) {
      y = this.points[0].y + (this.points[1].y - this.points[0].y)/2;
    }else if (index === 2) {
      y = this.points[1].y;
    }else if (index === 3) {
      y = this.points[1].y + (this.points[2].y - this.points[1].y)/2;
    }else if (index === 4) {
      y = this.points[2].y;
    }else if (index === 5) {
      y = this.points[3].y + (this.points[2].y - this.points[3].y)/2;
    }else if (index === 6) {
      y = this.points[3].y;
    }else if (index === 7) {
      y = this.points[0].y + (this.points[3].y - this.points[0].y)/2;
    }
    y = y - size/2;
    return y;
  }

  getHandlerSize() {
    return 10;
  }

  render() {
    return (
      <Host>
        <svg 
          version="1.1" 
          xmlns="http://www.w3.org/2000/svg"
          viewBox={this.viewBox}
        >
          {this.renderHandlersMaskDefs()}
          <image href={this.img ? this.img.src : ""}></image>
          <polygon
            mask="url(#myMask)"
            points={this.getPointsData()}
            stroke="green"
            stroke-width="2"
            fill="transparent"
          >
          </polygon>
          {this.renderHandlers()}
        </svg>
        <div class="footer">
          <section class="items">
            <div class="item accept-cancel" onClick={() => this.onCanceled()}>
              <img src="data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 512 512' enable-background='new 0 0 512 512' xml:space='preserve'%3E%3Ccircle fill='%23727A87' cx='256' cy='256' r='256'/%3E%3Cg id='Icon_5_'%3E%3Cg%3E%3Cpath fill='%23FFFFFF' d='M394.2,142L370,117.8c-1.6-1.6-4.1-1.6-5.7,0L258.8,223.4c-1.6,1.6-4.1,1.6-5.7,0L147.6,117.8 c-1.6-1.6-4.1-1.6-5.7,0L117.8,142c-1.6,1.6-1.6,4.1,0,5.7l105.5,105.5c1.6,1.6,1.6,4.1,0,5.7L117.8,364.4c-1.6,1.6-1.6,4.1,0,5.7 l24.1,24.1c1.6,1.6,4.1,1.6,5.7,0l105.5-105.5c1.6-1.6,4.1-1.6,5.7,0l105.5,105.5c1.6,1.6,4.1,1.6,5.7,0l24.1-24.1 c1.6-1.6,1.6-4.1,0-5.7L288.6,258.8c-1.6-1.6-1.6-4.1,0-5.7l105.5-105.5C395.7,146.1,395.7,143.5,394.2,142z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E" />
            </div>
            <div class="item accept-use" onClick={() => this.onConfirmed()}>
              <img src="data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 512 512' enable-background='new 0 0 512 512' xml:space='preserve'%3E%3Ccircle fill='%232CD865' cx='256' cy='256' r='256'/%3E%3Cg id='Icon_1_'%3E%3Cg%3E%3Cg%3E%3Cpath fill='%23FFFFFF' d='M208,301.4l-55.4-55.5c-1.5-1.5-4-1.6-5.6-0.1l-23.4,22.3c-1.6,1.6-1.7,4.1-0.1,5.7l81.6,81.4 c3.1,3.1,8.2,3.1,11.3,0l171.8-171.7c1.6-1.6,1.6-4.2-0.1-5.7l-23.4-22.3c-1.6-1.5-4.1-1.5-5.6,0.1L213.7,301.4 C212.1,303,209.6,303,208,301.4z'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E" />
            </div>
          </section>
        </div>
        <slot></slot>
      </Host>
    );
  }

}
