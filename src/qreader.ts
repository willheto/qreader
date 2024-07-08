import { startCamera } from './cameraCapture';
import { processFrame } from './qrScanner';

class QReader {
	private videoElement: HTMLVideoElement;
	public latestScan: string | null = null;
	private delayBetweenScans = 1000;

	public isCameraActive = false;
	public isScanningPaused = false;

	private onScan: (data: string) => void;

	constructor(
		videoElement: HTMLVideoElement,
		onScan: (data: string) => void,
		options: {
			delayBetweenScans?: number;
		} = {},
	) {
		this.videoElement = videoElement;
		this.delayBetweenScans =
			options.delayBetweenScans || this.delayBetweenScans;

		this.startCamera();
		this.initQrScanner();
		this.onScan = onScan;
	}

	private async startCamera(): Promise<void> {
		if (this.isCameraActive) {
			console.warn('Camera is already active');
			return;
		}

		try {
			await startCamera(this.videoElement);
			this.isCameraActive = true;
		} catch (error: any) {
			console.error('Error starting camera:', error);
		}
	}

	public async pauseScanning(): Promise<void> {
		if (this.isScanningPaused === true) {
			console.warn('Scanning is already paused');
			return;
		}

		this.isScanningPaused = true;
	}

	public async resumeScanning(): Promise<void> {
		if (this.isScanningPaused === false) {
			console.warn('Scanning is already active');
			return;
		}

		this.isScanningPaused = false;
		this.initQrScanner();
	}

	public async destroyInstance(): Promise<void> {
		this.pauseScanning();
		this.isCameraActive = false;

		const stream = this.videoElement.srcObject as MediaStream;

		if (stream) {
			const tracks = stream.getTracks();

			tracks.forEach(track => {
				track.stop();
			});

			this.videoElement.srcObject = null;
		}
	}

	private initQrScanner(): void {
		const scanFrame = (): void => {
			if (this.isScanningPaused) {
				return;
			}

			if (!this.isCameraActive) {
				setTimeout(() => {
					requestAnimationFrame(scanFrame);
				}, 2000);

				return;
			}

			const data = processFrame(this.videoElement);
			if (data !== null) {
				console.log(data);
				this.onScan(data);
				this.latestScan = data;

				setTimeout(() => {
					requestAnimationFrame(scanFrame);
				}, this.delayBetweenScans);
			} else {
				setTimeout(() => {
					requestAnimationFrame(scanFrame);
				}, 200);
			}
		};

		requestAnimationFrame(scanFrame);
	}
}

export default QReader;
