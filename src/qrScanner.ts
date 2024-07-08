import { createCanvas } from 'canvas';
import jsQR from 'jsqr';

export function processFrame(video: HTMLVideoElement): string | null {
	try {
		const canvas = createCanvas(video.videoWidth, video.videoHeight);
		const context = canvas.getContext('2d');

		// Check if the video dimensions are valid
		if (video.videoWidth <= 0 || video.videoHeight <= 0) {
			return null;
		}

		// @ts-expect-error - HTMLVideoElement is valid here
		context.drawImage(video, 0, 0, canvas.width, canvas.height);
		const imageData = context.getImageData(
			0,
			0,
			canvas.width,
			canvas.height,
		);

		// Check if imageData contains valid data
		if (!imageData.data) {
			console.error('Failed to get image data from canvas');
			return null;
		}

		const qrCode = jsQR(imageData.data, canvas.width, canvas.height);

		if (qrCode) {
			const readableData = processQRData(qrCode.data);
			if (readableData) {
				return readableData;
			}
		}

		return null;
	} catch (error: any) {
		console.error('Error processing frame:', error);
		return null;
	}
}

function processQRData(qrData: string): string | null {
	try {
		const parsedData = JSON.parse(qrData);
		return JSON.stringify(parsedData, null, 2);
	} catch (error: any) {
		if (qrData.trim()) {
			return qrData;
		}
		return null;
	}
}
