import {Component, ViewChild, NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {}from ''

@Component({
  selector: 'app-canvas-logo',
  template: `    
  <canvas #layout></canvas>
  `,
  styleUrls: ['./canvas-logo.component.css']
})
export class CanvasLogoComponent {

  constructor() { }


  @ViewChild('layout') canvasRef;
  image = "../../../assets/logo.png";
  ngAfterViewInit() {
    let canvas = this.canvasRef.nativeElement;
    let context = canvas.getContext('2d');

    let source = new Image();
    source.crossOrigin = 'Anonymous';
    source.onload = () => {
      canvas.height = source.height;
      canvas.width = source.width;
      context.drawImage(source, 0, 0);

      this.image = canvas.toDataURL();
    };
    source.src = this.image;
  }

  ngOnInit() {
  }


}
