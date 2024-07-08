export async function startCamera(
	videoElement: HTMLVideoElement,
): Promise<MediaStream> {
	const constraints = {
		video: {
			width: { ideal: 1280 },
			height: { ideal: 720 },
		},
	};

	try {
		const stream = await navigator.mediaDevices.getUserMedia(constraints);
		videoElement.srcObject = stream;
		await videoElement.play();
		return stream;
	} catch (error: any) {
		throw error;
	}
}
