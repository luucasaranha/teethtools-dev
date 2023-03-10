import {ElementRef, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  private videoStream: MediaStream;

  constructor() { }

  async hasCameraPermission(): Promise<boolean> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error getting camera permission:', error);
      return false;
    }
  }

  captureImage(imageElement: ElementRef<HTMLVideoElement>, canvasElement: ElementRef<HTMLCanvasElement>): Promise<Blob> {
    const captureWidth = 1280;
    const captureHeight = 720;

    return new Promise((resolve, reject) => {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          this.videoStream = stream;
          imageElement.nativeElement.srcObject = stream;
          imageElement.nativeElement.play();
        })
        .catch(error => {
          console.error('Error accessing camera', error);
          alert("Acesso negado para acessar a camera");
          reject(error);
        });

      imageElement.nativeElement.addEventListener('loadeddata', () => {
        if (this.videoStream && this.videoStream.getTracks) {
          canvasElement.nativeElement.width = captureWidth;
          canvasElement.nativeElement.height = captureHeight;

          const scaleFactor = Math.min(
            captureWidth / imageElement.nativeElement.videoWidth,
            captureHeight / imageElement.nativeElement.videoHeight
          );

          const scaledWidth = imageElement.nativeElement.videoWidth * scaleFactor;
          const scaledHeight = imageElement.nativeElement.videoHeight * scaleFactor;
          const x = (captureWidth - scaledWidth) / 2;
          const y = (captureHeight - scaledHeight) / 2;

          const context = canvasElement.nativeElement.getContext('2d');
          context.drawImage(imageElement.nativeElement, x, y, scaledWidth, scaledHeight);

          imageElement.nativeElement.pause();
          this.videoStream.getTracks().forEach(track => track.stop());

          canvasElement.nativeElement.toBlob(blob => {
            resolve(blob);
          }, 'image/jpeg', 0.7);
        }
      });
    });
  }

}
